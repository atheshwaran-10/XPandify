//@ts-ignore
import ReactGiphySearchbox from 'react-giphy-searchbox'

const GifInput = () => (
  <ReactGiphySearchbox
    apiKey={process.env.GIPHY_SECRET}
    onSelect={(item: any) => console.log(item)}
  />
)

export default GifInput;