import React, { useState, useEffect } from 'react'
import useTextToxicity from "react-text-toxicity"

const Toxicity = ({ text }) => {
    const style = { margin: 10 };   
    var lstData = null;
    const [value, setValue] = useState(text)
    const predictions = useTextToxicity(value)

    // if (predictions != null) {
    //     lstData = predictions.select(function(obj) {
    //       return obj.match = true;
    //   });
    // }

    useEffect(() => {
      if(text.length > 0){
        setValue(text)
        console.log(predictions)
      }
  },[text])

    if (!predictions) return <div style={style}>Loading predictions...🙄</div>

  return (
    <div style={style}>
      {predictions.map(({ label, match, probability }) => (
        <div style={{ margin: 5 }} key={label}>
          {match === true ? `So ${label} 🤢 (${probability})` : '' }
        </div>
      ))}
    </div>
    
  )
}
export default Toxicity