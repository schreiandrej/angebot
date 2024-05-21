import {
  calcEnergiezuschlag,
  calcGefahrgutzuschlag,
  calcGesamtPreis,
  calcGuthaben,
  calcMengenzuschlag,
  calcPreisGesamtmenge,
  calcPreisProLiter,
} from './calculations'
import { IOutput } from 'app/types'

interface Props {
  formState: IOutput
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
    checkboxADRZuschlag,
    checkboxMengenzuschlag,
  } = formState

  return (
    <section className='flex flex-col w-full items-center p-5 text-sm'>
      <table id='table' className='w-4/5'>
        <thead className='border-b border-b-slate-200'>
          <tr className=''>
            <th className='text-left'>Liefermenge:</th>
            <th className='text-right'></th>
            <th className='text-right'> {liefermenge} Liter</th>
          </tr>
          <tr className='text-sm'>
            <td className='text-left'>Behältervolumen:</td>
            <td className='text-right'></td>
            <td className='text-right'> {tankvolumen} Liter</td>
          </tr>
          {füllstand !== null && (
            <>
              <tr className='text-sm'>
                <td className='text-left'>Füllstand:</td>
                <td className='text-right'></td>
                <td className='text-right'> {füllstand} %</td>
              </tr>
            </>
          )}
        </thead>
        <tbody className='font-base'>
          <tr className='text-xs'>
            <td className=''></td>

            <td className='text-right cursor-pointer hover:text-hover  pt-2'>
              zzgl. MwSt.
            </td>

            <td className='text-right cursor-pointer hover:text-hover pt-2'>
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

          {checkboxMengenzuschlag && (
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
          {checkboxADRZuschlag && (
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
          {guthaben !== 0 && (
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
                  checkboxADRZuschlag,
                  checkboxMengenzuschlag
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
                  checkboxADRZuschlag,
                  checkboxMengenzuschlag
                ).brutto
              }
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
