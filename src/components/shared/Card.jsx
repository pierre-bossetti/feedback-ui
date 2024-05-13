import PropTypes from 'prop-types'

function Card({ children, reverse = false }) {
  //Conditional class
  return<div className={`card ${reverse && 'reverse'}`}>{children}</div>
  
  /*Conditional style
  return <div className="card" style={{
    backgroundColor: reverse ? "rgba(0,0,0,0.4)" : "white",
    color: reverse ? "white" : "black"
  }}>{children}</div>*/
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool,
}

export default Card
