import PropTypes from 'prop-types'
import { Vector3 } from 'three';

CustomPoint.propTypes = {
  index: PropTypes.number,
  position: PropTypes.instanceOf(Vector3),
  color: PropTypes.string
}

/**/
export default function CustomPoint(props){
  return (
    <group key={props.index}>
    <mesh key={props.index} position={props.position} >
    <sphereGeometry args={[0.05,32,32]} />
    <meshStandardMaterial color={props.color}/>
  </mesh>
    </group>
  
  );
};