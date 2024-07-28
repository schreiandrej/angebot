import {
  calcEnergiezuschlag,
  calcGefahrgutzuschlag,
  calcGesamtPreis,
  calcGuthaben,
  calcMengenzuschlag,
  calcPreisGesamtmenge,
  calcPreisProLiter,
} from '../lib/calculations'
import { FormState } from 'app/page'

type Props = {
  formState: FormState
}

export const OutputSection = ({ formState }: Props) => {
  const {
    literpreis,
    liefermenge,
    füllstand,
    tankvolumen,
    mengenzuschlag,
    energiezuschlag,
    gefahrgutzuschlag,
    guthaben,
    gefahrgutzuschlag_checkbox,
    mengenzuschlag_checkbox,
  } = formState

  return (
    <section className='flex flex-col max-w-4xl w-full items-center text-sm'>
      <table id='table' className='w-4/5 rounded-lg'>
        <thead className='border-transparent'>
          <tr className=''>
            <th className='text-left'>Liefermenge:</th>
            <th className='text-right'></th>
            <th className='text-right'>
              {' '}
              {liefermenge?.toFixed(0) || 0} Liter
            </th>
          </tr>
          <tr className='text-sm'>
            <td className='text-left'>Behältervolumen:</td>
            <td className='text-right'></td>
            <td className='text-right'> {tankvolumen || 0} Liter</td>
          </tr>
          {füllstand !== null && (
            <>
              <tr className='text-sm'>
                <td className='text-left'>Füllstand:</td>
                <td className='text-right'></td>
                <td className='text-right'> {füllstand || 0} %</td>
              </tr>
            </>
          )}
          <tr className='w-full h-5'></tr>
        </thead>
        <tbody className='font-base'>
          <tr className='text-xs'>
            <td className=''></td>

            <td className='text-right cursor-pointer hover:text-hover pt-2 font-semibold'>
              zzgl. MwSt.
            </td>

            <td className='text-right cursor-pointer hover:text-hover pt-2 font-semibold'>
              inkl. MwSt.
            </td>
          </tr>
          <tr className=''>
            <td className=''>Preis/l:</td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {calcPreisProLiter(literpreis).netto}
            </td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {calcPreisProLiter(literpreis).brutto}
            </td>
          </tr>
          <tr className=''>
            <td className=''>Flüssiggas:</td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {calcPreisGesamtmenge(literpreis, liefermenge).netto}
            </td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {calcPreisGesamtmenge(literpreis, liefermenge).brutto}
            </td>
          </tr>

          {mengenzuschlag_checkbox && (
            <tr className=''>
              <td className=''>Teilmengenzuschlag:</td>
              <td className='text-right cursor-pointer hover:text-hover'>
                {calcMengenzuschlag(mengenzuschlag).netto}
              </td>
              <td className='text-right cursor-pointer hover:text-hover'>
                {calcMengenzuschlag(mengenzuschlag).brutto}
              </td>
            </tr>
          )}
          {gefahrgutzuschlag_checkbox && (
            <>
              <tr className=''>
                <td className=''>Gefahrgutzuschlag:</td>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {calcGefahrgutzuschlag(gefahrgutzuschlag).netto}
                </td>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {calcGefahrgutzuschlag(gefahrgutzuschlag).brutto}
                </td>
              </tr>
              <tr className=''>
                <td className='pb-3'>Energiezuschlag:</td>
                <td className='pb-3 text-right cursor-pointer hover:text-hover'>
                  {calcEnergiezuschlag(energiezuschlag).netto}
                </td>
                <td className='pb-3 text-right cursor-pointer hover:text-hover'>
                  {calcEnergiezuschlag(energiezuschlag).brutto}
                </td>
              </tr>
            </>
          )}
          {guthaben && (
            <>
              <tr className=''>
                <td className=''>Guthaben:</td>
                <td className='text-right cursor-pointer hover:text-hover'></td>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {`- ${calcGuthaben(guthaben)}`}
                </td>
              </tr>
            </>
          )}
          <tr className='border-t border-b-slate-200 font-bold'>
            <td className=''>Gesamtpreis:</td>

            <td
              role='nettoGesamtpreis'
              className='text-right cursor-pointer hover:text-hover'
            >
              {
                calcGesamtPreis(
                  literpreis,
                  liefermenge,
                  mengenzuschlag,
                  gefahrgutzuschlag,
                  energiezuschlag,
                  guthaben,
                  gefahrgutzuschlag_checkbox,
                  mengenzuschlag_checkbox
                ).netto
              }
            </td>

            <td className='text-right cursor-pointer hover:text-hover'>
              {
                calcGesamtPreis(
                  literpreis,
                  liefermenge,
                  mengenzuschlag,
                  gefahrgutzuschlag,
                  energiezuschlag,
                  guthaben,
                  gefahrgutzuschlag_checkbox,
                  mengenzuschlag_checkbox
                ).brutto
              }
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
