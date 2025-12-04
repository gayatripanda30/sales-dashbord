import "./globals.css";

export const metadata = {
  title: "Sales Dashboard",
  description: "Dashboard built with Next.js + Recharts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{background:'transparent',padding:'18px 0',borderBottom:'1px solid rgba(0,0,0,0.03)',marginBottom:8}}>
          <div style={{maxWidth:1100,margin:'0 auto',padding:'0 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:44,height:44,borderRadius:10,background:'linear-gradient(90deg,#6366f1,#818cf8)'}} />
              <div>
                <div style={{fontWeight:800,fontSize:18}}>Sales Dashboard</div>
                <div style={{fontSize:12,color:'#6b7280'}}>Insightful charts & metrics</div>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <div style={{width:40,height:40,borderRadius:999,background:'#111',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>G</div>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
