'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from './ui/input'
import {
  currentMwstFactor,
  initialValues,
  tankvolumenOptions,
} from '@/lib/constants'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Checkbox } from './ui/checkbox'
import { formatNumber } from '@/lib/utils'
import { FormState } from 'app/page'
import { RotateCcwIcon } from 'lucide-react'

type Props = {
  setFormState: (formState: FormState) => void
  setUpdateTimestamp: (timestamp: number) => void
}

const formSchema = z.object({
  literpreis: z.string().min(1, { message: 'Bitte einen Preis eingeben!' }),
  liefermenge: z.string(),
  füllstand: z
    .number()
    .max(85, { message: 'Bitte einen Wert zwischen 0 und 85 eingeben!' })
    .min(0, { message: 'Bitte einen Wert zwischen 0 und 85 eingeben!' }),
  tankvolumen: z
    .string()
    .min(1, { message: 'Bitte ein Tankvolumen auswählen!' }),
  mengenzuschlag: z.string(),
  energiezuschlag: z.string(),
  gefahrgutzuschlag: z.string(),
  vorkasse: z.string(),
  guthaben: z.string(),
  gefahrgutzuschlag_checkbox: z.boolean(),
  mengenzuschlag_checkbox: z.boolean(),
})

export function FormComponent({ setFormState, setUpdateTimestamp }: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      literpreis: '',
      liefermenge: '',
      füllstand: 0,
      tankvolumen: '',
      mengenzuschlag: formatNumber(initialValues.mengenzuschlag),
      energiezuschlag: formatNumber(initialValues.energiezuschlag),
      gefahrgutzuschlag: formatNumber(initialValues.gefahrgutzuschlag),
      vorkasse: '',
      guthaben: '',
      gefahrgutzuschlag_checkbox: initialValues.gefahrgutzuschlag_checkbox,
      mengenzuschlag_checkbox: initialValues.mengenzuschlag_checkbox,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(formValues: z.infer<typeof formSchema>) {
    const transformData = (formData: z.infer<typeof formSchema>) => {
      const data: any = initialValues

      for (const [key, value] of Object.entries(formData)) {
        if (typeof value === 'string' && value.length > 0) {
          data[key] = Number((value as string).replace(',', '.'))
        } else if (typeof value === 'boolean') {
          data[key] = value
        } else {
          data[key] = null
        }
      }

      data['mengenzuschlag'] = data.mengenzuschlag_checkbox
        ? data.mengenzuschlag
        : 0
      data['gefahrgutzuschlag'] = data.gefahrgutzuschlag_checkbox
        ? data.gefahrgutzuschlag
        : 0
      data['energiezuschlag'] = data.gefahrgutzuschlag_checkbox
        ? data.energiezuschlag
        : 0

      const berechneteVorkasseLiefermenge =
        (data['vorkasse'] / currentMwstFactor -
          data['mengenzuschlag'] -
          data['gefahrgutzuschlag'] -
          data['energiezuschlag']) /
        (data['literpreis'] / 100)

      data['liefermenge'] = data['vorkasse']
        ? (data['liefermenge'] = berechneteVorkasseLiefermenge)
        : data.liefermenge
          ? data.liefermenge
          : Math.floor((data.tankvolumen * (85 - data.füllstand)) / 100)

      return data
    }

    const timestampt = new Date().getTime()
    setUpdateTimestamp(timestampt)

    setFormState(transformData(formValues))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='relative'>
        <div className='w-full flex felx-row gap-7'>
          <div className='flex flex-col gap-7'>
            <FormField
              control={form.control}
              name='literpreis'
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preis je 100 Liter</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute right-3 top-1/2 -translate-y-1/2 text-primary/50'>
                        €
                      </div>
                      <Input placeholder='Literpreis' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='füllstand'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Füllstand in %</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute right-3 top-1/2 -translate-y-1/2 text-primary/50'>
                        %
                      </div>
                      <Input
                        placeholder='Füllstand'
                        type='number'
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === null) {
                            field.onChange(0)
                          } else {
                            field.onChange(Number(value))
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='liefermenge'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liefermenge in Liter</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute right-3 top-1/2 -translate-y-1/2 text-primary/50'>
                        Liter
                      </div>
                      <Input placeholder='Liefermenge' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-7'>
            <FormField
              control={form.control}
              name='vorkasse'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vorkasse zu zahlen</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute right-3 top-1/2 -translate-y-1/2 text-primary/50'>
                        €
                      </div>
                      <Input placeholder='Vorkasse' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='guthaben'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vorhandenes Guthaben</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute right-3 top-1/2 -translate-y-1/2 text-primary/50'>
                        €
                      </div>
                      <Input placeholder='Guthaben' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-7'>
            <FormField
              control={form.control}
              name='gefahrgutzuschlag'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-row justify-between items-center pr-1'>
                    <FormLabel>Gefahrgutzuschlag</FormLabel>
                    <FormField
                      control={form.control}
                      name='gefahrgutzuschlag_checkbox'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute right-3 top-1/2 -translate-y-1/2 text-primary/50'>
                        €
                      </div>
                      <Input placeholder='Gefahrgutzuschlag' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='energiezuschlag'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Energiezuschlag</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute right-3 top-1/2 -translate-y-1/2 text-primary/50'>
                        €
                      </div>
                      <Input placeholder='Energiezuschlag' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='mengenzuschlag'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-row justify-between items-center pr-1'>
                    <FormLabel>Mengenzuschlag</FormLabel>
                    <FormField
                      control={form.control}
                      name='mengenzuschlag_checkbox'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute right-3 top-1/2 -translate-y-1/2 text-primary/50'>
                        €
                      </div>
                      <Input placeholder='Mengenzuschlag' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-7 justify-between'>
            <FormField
              control={form.control}
              name='tankvolumen'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Behältervolumen</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                    >
                      <SelectTrigger className='w-[184px]'>
                        <SelectValue
                          className='placeholder:px-1 placeholder:text-xs'
                          placeholder='Wähle das Tankvolumen aus.'
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {tankvolumenOptions.map((tank) => (
                          <SelectItem key={tank.id} value={`${tank.value}`}>
                            {`${tank.value} Liter`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='w-full flex flex-row-reverse justify-between gap-2'>
              <Button className='w-full flex' type='submit'>
                Berechne
              </Button>
              <Button
                type='reset'
                onClick={() => {
                  form.resetField('vorkasse')
                  form.resetField('literpreis')
                  form.resetField('füllstand')
                  form.resetField('liefermenge')
                  form.resetField('guthaben')
                }}
                className='w-full flex'
              >
                <RotateCcwIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
