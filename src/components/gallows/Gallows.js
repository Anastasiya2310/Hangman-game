import './gallows.scss';
import gallow from 'img/gallows-t.svg'

const Gallows = ({ failed }) => {
  let hangmanParts = [];

  if(failed > 0 && hangmanParts.length === 0) {
    for(let i = 0; i < failed; i++) {
      switch(i){
        case 1:
          hangmanParts.push(<div className="man man-head" key='head'><span className="eye left-eye">&#10006;</span><span className="eye right-eye">&#10006;</span></div>)
          break;
        case 2:
          hangmanParts.push(<div className="man man-body" key='body'></div>)
          break;
        case 3:
          hangmanParts.push(<div className="man man-left-arm" key='left-arm'></div>)
          break;
        case 4:
          hangmanParts.push(<div className="man man-right-arm" key='right-arm'></div>)
          break;
        case 5:
          hangmanParts.push(<div className="man man-left-leg" key='left-leg'></div>)
          break;
        case 6:
          hangmanParts.push(<div className="man man-right-leg" key='right-leg'></div>)
          break;
        default:
          break
      }
    }
  }

  switch(failed){
    case 1:
      hangmanParts.push(<div className="man man-head" key='head'><span className="eye left-eye">&#10006;</span><span className="eye right-eye">&#10006;</span></div>)
      break;
    case 2:
      hangmanParts.push(<div className="man man-body" key='body'></div>)
      break;
    case 3:
      hangmanParts.push(<div className="man man-left-arm" key='left-arm'></div>)
      break;
    case 4:
      hangmanParts.push(<div className="man man-right-arm" key='right-arm'></div>)
      break;
    case 5:
      hangmanParts.push(<div className="man man-left-leg" key='left-leg'></div>)
      break;
    case 6:
      hangmanParts.push(<div className="man man-right-leg" key='right-leg'></div>)
      break;
    default:
      hangmanParts = [];
  }

  return (
    <>
      <div className='gallows-img'>
        <img src={gallow} alt='gallows' />
        {hangmanParts}
      </div>
    </>
  )
}

export default Gallows;