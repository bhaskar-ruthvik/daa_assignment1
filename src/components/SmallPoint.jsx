import PropTypes from 'prop-types'
import { Vector3 } from 'three';

SmallPoint.propTypes = {
  index: PropTypes.number,
  position: PropTypes.instanceOf(Vector3),
  color: PropTypes.string
}

/**/
export default function SmallPoint(props){
  return (
    <group key={props.index}>
    <mesh key={props.index} position={props.position} >
    <sphereGeometry args={[0.02,32,32]} />
    <meshStandardMaterial color={props.color}/>
  </mesh>
    </group>
  
  );
};