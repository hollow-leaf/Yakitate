export function Intro() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Introduction
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The goal of our project is to realize a decentralized food bank platform provider. We use Algorand to store and retrieve the acquired food donations metadata, and provide food to receiver, who can obtain food and track food source.
      </p>
      <h2 className="text-3-1 font-extrabold tracking-tigh">Our solution has the following features and advantages:</h2>
      <br />
      <li>Provide a food platform to facilitate food distribution</li>
      <li>Tracking food sources</li>
      <li>Implement a food map</li>
      <li>Receivers can freely choose the type of food</li>
      <br />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Taiwan Food map
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Receiver can search donated food using our food map.They can get food nearby. 
      </p>
    </div>
  )
}
