import AutoScrollRow from './AutoScrollRow.jsx'

const hide = (e) => { e.currentTarget.style.display = 'none' }

// 4 + 4 web screens — titles/descriptions above each, image path web_pageN.png
const screens = [
  { img: 'web_page1', title: 'Home', desc: 'Hero, categories & fresh deals.' },
  { img: 'web_page2', title: 'Category', desc: 'Browse chicken, mutton & seafood.' },
  { img: 'web_page3', title: 'Product', desc: 'Cuts, weight & add to cart.' },
  { img: 'web_page4', title: 'Cart', desc: 'Review items & delivery slot.' },
  { img: 'web_page5', title: 'Checkout', desc: 'Address, payment & confirm.' },
  { img: 'web_page6', title: 'Order Tracking', desc: 'Live status to your door.' },
  { img: 'web_page7', title: 'Catering', desc: 'BBQ & events enquiry.' },
  { img: 'web_page8', title: 'Account', desc: 'Orders, credit & meat club.' },
]

function Card({ s }) {
  return (
    <figure className="ws-card">
      <figcaption className="ws-cap">
        <h4>{s.title}</h4>
        <p>{s.desc}</p>
      </figcaption>
      <div className="ws-shot">
        <span className="ws-bar"><i /><i /><i /></span>
        <div className="ws-img">
          <span className="ws-ph">{s.img}</span>
          <img src={`/projects/project3/final-screens/${s.img}.png`} alt="" onError={hide} />
        </div>
      </div>
    </figure>
  )
}

export default function WebScreens() {
  return (
    <div className="ws">
      <AutoScrollRow className="ws-row">
        {screens.slice(0, 4).map((s) => <Card key={s.img} s={s} />)}
      </AutoScrollRow>
      <AutoScrollRow className="ws-row" reverse>
        {screens.slice(4, 8).map((s) => <Card key={s.img} s={s} />)}
      </AutoScrollRow>
    </div>
  )
}
