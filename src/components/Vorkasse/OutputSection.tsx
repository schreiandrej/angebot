import { CopyToClipboard } from 'react-copy-to-clipboard'

export const OutputSection = ({
  preisProLiter,
  liter,
  preis,
  zuschlag,
  adr,
}) => {
  const currentMwstFactor = 1.19

  return (
    <div className='flex flex-col w-full p-5'>
      <div className='w-full mb-4 font-semibold'>
        <div className='flex flex-row justify-between'>
          <div className='flex-1'>Bestellmenge:</div>
          <div className='flex-1 text-right'> {liter} L</div>
        </div>
      </div>

      <table className='w-full '>
        <thead>
          <tr className='text-xs font-extralight'>
            <th className=''></th>
            <th className=' text-right'>zzgl. MwSt.</th>
            <th className=' text-right'>inkl. MwSt. </th>
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
            <td className=''>Gaskosten:</td>
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
            <tr className='  '>
              <td className=''>Zuschlag:</td>
              <CopyToClipboard text={zuschlag.toFixed(2)}>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {zuschlag.toFixed(2)} €
                </td>
              </CopyToClipboard>
              <CopyToClipboard text={(zuschlag * currentMwstFactor).toFixed(2)}>
                <td className=' text-right cursor-pointer hover:text-hover'>
                  {(zuschlag * currentMwstFactor).toFixed(2)} €
                </td>
              </CopyToClipboard>
            </tr>
          )}
          {adr !== 0 && (
            <tr className='  '>
              <td className=''>ADR:</td>
              <CopyToClipboard text={adr.toFixed(2)}>
                <td className='text-right cursor-pointer hover:text-hover'>
                  {adr.toFixed(2)} €
                </td>
              </CopyToClipboard>
              <CopyToClipboard text={(adr * currentMwstFactor).toFixed(2)}>
                <td className=' text-right cursor-pointer hover:text-hover'>
                  {(adr * currentMwstFactor).toFixed(2)} €
                </td>
              </CopyToClipboard>
            </tr>
          )}

          <tr className=' font-bold mt-1 '>
            <td className=''>Gesamtpreis:</td>
            <CopyToClipboard text={(preis / currentMwstFactor).toFixed(2)}>
              <td className='text-right cursor-pointer hover:text-hover'>
                {(preis / currentMwstFactor).toFixed(2)} €
              </td>
            </CopyToClipboard>
            <CopyToClipboard text={preis.toFixed(2)}>
              <td className=' text-right cursor-pointer hover:text-hover'>
                {preis.toFixed(2)} €
              </td>
            </CopyToClipboard>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
