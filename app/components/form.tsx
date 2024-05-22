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
import { initialValues, tankvolumenOptions } from '@/lib/constants'
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

type Props = {
  formState: FormState
  setFormState: (formState: FormState) => void
}

const formSchema = z.object({
  literpreis: z.string().min(1, { message: 'Bitte einen Preis eingeben!' }),
  liefermenge: z.string(),
  füllstand: z.string(),
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

export function FormComponent({ formState, setFormState }: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      literpreis: '',
      liefermenge: '',
      füllstand: '',
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
      const transformedData: any = initialValues

      for (const [key, value] of Object.entries(formData)) {
        if (typeof value === 'string' && value.length > 0) {
          transformedData[key] = Number((value as string).replace(',', '.'))
        } else if (typeof value === 'boolean') {
          transformedData[key] = value
        } else {
          transformedData[key] = null
        }
      }

      transformedData['liefermenge'] =
        (transformedData.tankvolumen * (85 - transformedData.füllstand)) / 100

      return transformedData
    }

    setFormState(transformData(formValues))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='w-full flex felx-row gap-5'>
          <div className='flex flex-col gap-3'>
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
                      <Input placeholder='Füllstand' {...field} />
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
          <div className='flex flex-col gap-3'>
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
          <div className='flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='gefahrgutzuschlag'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-row justify-between items-center'>
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
                  <div className='flex flex-row justify-between items-center'>
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
          <div className='flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='tankvolumen'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Behältervolumen</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
          </div>
        </div>
        <div className='w-full flex justify-end'>
          <Button type='submit'>Berechne</Button>
        </div>
      </form>
    </Form>
  )
}
