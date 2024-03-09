import './index.css'

const EachCard = props => {
  const {eachItem} = props

  return (
    <li key={eachItem.id}>
      <div>
        <img
          src={eachItem.image_url}
          alt={eachItem.name}
          className="eachCard"
        />
        <p>{eachItem.name}</p>
      </div>
    </li>
  )
}

export default EachCard
