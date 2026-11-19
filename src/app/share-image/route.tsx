import { ImageResponse } from 'next/og';
import { shareImage } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      padding: '66px 76px',
      borderBottom: '18px solid #c5f52a',
      background: '#11130f',
      color: '#f5f3ee',
    }}>
      <div style={{ display: 'flex', fontSize: 39, fontWeight: 700 }}>
        Webbound<span style={{ color: '#c5f52a' }}>.</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 70, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-3px' }}>
        <span>Websites for architecture</span>
        <span>and interior design studios</span>
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#c5f52a' }}>
        Independent web design and development in India
      </div>
    </div>,
    { width: shareImage.width, height: shareImage.height },
  );
}
