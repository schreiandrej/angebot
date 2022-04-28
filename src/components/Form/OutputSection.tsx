import { CopyToClipboard } from 'react-copy-to-clipboard'

type OutputSectionType = {
  preisProLiter: number
  liter: number
  preis: number
  zuschlag: number
  adr: number
}

export const OutputSection = ({
  preisProLiter,
  liter,
  preis,
  zuschlag,
  adr,
}: OutputSectionType) => {
  const currentMwstFactor = 1.19

  return (
    <section className='flex flex-col w-full items-center p-5'>
      <table className='w-4/5'>
        <thead className='border-b border-b-slate-200'>
          <tr className=''>
            <th className='text-left'>Liefermenge</th>
            <th className='text-right'></th>
            <th className='text-right'> {liter} Liter</th>
          </tr>
        </thead>
        <tbody className='font-base'>
          <tr className='text-xs'>
            <td className=''></td>

            <td className='text-right cursor-pointer hover:text-hover  pt-4'>
              zzgl. MwSt.
            </td>

            <td className='text-right cursor-pointer hover:text-hover pt-4'>
              inkl. MwSt.
            </td>
          </tr>
          <tr className=''>
            <td className=''>Preis/l:</td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {preisProLiter.toFixed(4).replace('.', ',')} €
            </td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {(preisProLiter * currentMwstFactor).toFixed(4).replace('.', ',')}
              €
            </td>
          </tr>
          <tr className=''>
            <td className=''>Flüssiggas:</td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {(preisProLiter * liter).toFixed(2).replace('.', ',')} €
            </td>
            <td className='text-right cursor-pointer hover:text-hover'>
              {(preisProLiter * liter * currentMwstFactor)
                .toFixed(2)
                .replace('.', ',')}{' '}
              €
            </td>
          </tr>

          {zuschlag !== 0 && (
            <tr className=''>
              <td className=''>Teilmengenzuschlag:</td>
              <td className='text-right cursor-pointer hover:text-hover'>
                {zuschlag.toFixed(2).replace('.', ',')} €
              </td>
              <td className='text-right cursor-pointer hover:text-hover'>
                {(zuschlag * currentMwstFactor).toFixed(2).replace('.', ',')} €
              </td>
            </tr>
          )}
          {adr !== 0 && (
            <>
              <tr className=''>
                <td className=''>Gefahrgutzuschlag:</td>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {adr.toFixed(2).replace('.', ',')} €
                </td>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {(adr * currentMwstFactor).toFixed(2).replace('.', ',')} €
                </td>
              </tr>
              <tr className=''>
                <td className='pb-3'>Dieselzuschlag:</td>
                <td className='pb-3 text-right cursor-pointer hover:text-hover'>
                  {(4.2).toFixed(2).replace('.', ',')} €
                </td>
                <td className='pb-3 text-right cursor-pointer hover:text-hover'>
                  {(4.2 * currentMwstFactor).toFixed(2).replace('.', ',')} €
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
                {(preis / currentMwstFactor).toFixed(2).replace('.', ',')} €
              </td>
            </CopyToClipboard>
            <CopyToClipboard text={preis.toFixed(2)}>
              <td className='text-right cursor-pointer hover:text-hover'>
                {preis.toFixed(2).replace('.', ',')} €
              </td>
            </CopyToClipboard>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
