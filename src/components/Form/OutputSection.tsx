import {
  calcGesamtPreis,
  calcPreisGesamtmenge,
  calcPreisProLiter,
  calcZuschlag,
} from '@/utils/outputCalculations'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  preisProLiter: number
  liter: number
  preis: number
  zuschlag: number
  dieselzuschlag: number
  adr: number
}

export const OutputSection = ({
  preisProLiter,
  liter,
  preis,
  zuschlag,
  dieselzuschlag,
  adr,
}: Props) => {
  const currentMwstFactor = 1.19

  return (
    <section className='flex flex-col w-full items-center p-5'>
      <table className='w-4/5'>
        <thead className='border-b border-b-slate-200'>
          <tr className=''>
            <th className='text-left'>Liefermenge:</th>
            <th className='text-right'></th>
            <th className='text-right'> {liter} Liter</th>
          </tr>
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
              {calcPreisProLiter(preisProLiter).netto}
            </td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {calcPreisProLiter(preisProLiter).brutto}
            </td>
          </tr>
          <tr className=''>
            <td className=''>Flüssiggas:</td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {calcPreisGesamtmenge(preisProLiter, liter).netto}
            </td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {calcPreisGesamtmenge(preisProLiter, liter).brutto}
            </td>
          </tr>

          {zuschlag !== 0 && (
            <tr className=''>
              <td className=''>Teilmengenzuschlag:</td>
              <td className='text-right cursor-pointer hover:text-hover'>
                {calcZuschlag(zuschlag).netto}
              </td>
              <td className='text-right cursor-pointer hover:text-hover'>
                {calcZuschlag(zuschlag).brutto}
              </td>
            </tr>
          )}
          {adr !== 0 && (
            <>
              <tr className=''>
                <td className=''>Gefahrgutzuschlag:</td>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {calcZuschlag(adr).netto}
                </td>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {calcZuschlag(adr).brutto}
                </td>
              </tr>
              <tr className=''>
                <td className='pb-3'>Dieselzuschlag:</td>
                <td className='pb-3 text-right cursor-pointer hover:text-hover'>
                  {calcZuschlag(dieselzuschlag).netto}
                </td>
                <td className='pb-3 text-right cursor-pointer hover:text-hover'>
                  {calcZuschlag(dieselzuschlag).brutto}
                </td>
              </tr>
            </>
          )}
          <tr className='border-t border-b-slate-200 font-bold'>
            <td className=''>Gesamtpreis:</td>
            <CopyToClipboard text={(preis / currentMwstFactor).toFixed(2)}>
              <td
                role='nettoGesamtpreis'
                className='text-right cursor-pointer hover:text-hover'
              >
                {calcGesamtPreis(preis).netto}
              </td>
            </CopyToClipboard>
            <CopyToClipboard text={preis.toFixed(2)}>
              <td className='text-right cursor-pointer hover:text-hover'>
                {calcGesamtPreis(preis).brutto}
              </td>
            </CopyToClipboard>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
