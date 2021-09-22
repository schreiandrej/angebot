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
    <div className='flex flex-col w-full p-5'>
      <table className='w-full '>
        <thead>
          <tr className='text-lg'>
            <th className='text-left'>Bestellung</th>
            <th className='text-right '></th>
            <th className='text-right '> {liter} Liter</th>
          </tr>
        </thead>
        <tbody>
          <tr className=''>
            <td className=''>Preis/l:</td>
            <CopyToClipboard text={preisProLiter.toFixed(4)}>
              <td className='text-right cursor-pointer hover:text-hover'>
                {preisProLiter.toFixed(4)} €
              </td>
            </CopyToClipboard>
            <CopyToClipboard
              text={(preisProLiter * currentMwstFactor).toFixed(4)}
            >
              <td className='text-right cursor-pointer hover:text-hover'>
                {(preisProLiter * currentMwstFactor).toFixed(4)} €
              </td>
            </CopyToClipboard>
          </tr>
          <tr className=''>
            <td className=''>Flüssiggas:</td>
            <CopyToClipboard text={(preisProLiter * liter).toFixed(2)}>
              <td className='text-right cursor-pointer hover:text-hover'>
                {(preisProLiter * liter).toFixed(2)} €
              </td>
            </CopyToClipboard>
            <CopyToClipboard
              text={(preisProLiter * liter * currentMwstFactor).toFixed(2)}
            >
              <td className='text-right cursor-pointer hover:text-hover'>
                {(preisProLiter * liter * currentMwstFactor).toFixed(2)} €
              </td>
            </CopyToClipboard>
          </tr>

          {zuschlag !== 0 && (
            <tr className=''>
              <td className=''>Teilmengenzuschlag:</td>
              <CopyToClipboard text={zuschlag.toFixed(2)}>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {zuschlag.toFixed(2)} €
                </td>
              </CopyToClipboard>
              <CopyToClipboard text={(zuschlag * currentMwstFactor).toFixed(2)}>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {(zuschlag * currentMwstFactor).toFixed(2)} €
                </td>
              </CopyToClipboard>
            </tr>
          )}
          {adr !== 0 && (
            <tr className=''>
              <td className=''>Gefahrgutzuschlag:</td>
              <CopyToClipboard text={adr.toFixed(2)}>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {adr.toFixed(2)} €
                </td>
              </CopyToClipboard>
              <CopyToClipboard text={(adr * currentMwstFactor).toFixed(2)}>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {(adr * currentMwstFactor).toFixed(2)} €
                </td>
              </CopyToClipboard>
            </tr>
          )}

          <tr className='mt-1 font-bold '>
            <td className=''>Gesamtpreis:</td>
            <CopyToClipboard text={(preis / currentMwstFactor).toFixed(2)}>
              <td className='text-right cursor-pointer hover:text-hover'>
                {(preis / currentMwstFactor).toFixed(2)} € zzgl. MwSt.
              </td>
            </CopyToClipboard>
            <CopyToClipboard text={preis.toFixed(2)}>
              <td className='text-right cursor-pointer hover:text-hover'>
                {preis.toFixed(2)} € inkl. MwSt.
              </td>
            </CopyToClipboard>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
