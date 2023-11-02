// Vendor and internal dependencies
import { DownloadButton } from 'components';

// function handleDownload(href) {
//   var iframe = "<iframe width='100%' height='100%' src='" + href + "'></iframe>";
//   var x = window.open();
//   x.document.open();
//   x.document.write(iframe);
//   x.document.close();
// }

export default function File(props) {
  const { fileName, href, textLinkTarget } = props;

  return (
    <DownloadButton
      icon={textLinkTarget === '_blank' ? 'PopOut' : 'Download'}
      href={href}
      target={textLinkTarget}
      // onClick={() => handleDownload(href)}
    >
      {fileName}
    </DownloadButton>
  );
}
