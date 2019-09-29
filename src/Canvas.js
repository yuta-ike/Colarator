import firebase from 'firebase/app'
import firebaseApp from './firebaseSetup.js'
import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import getUUID from './uuid.js'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

const storageRef = firebaseApp.storage().ref()
const firestore = firebaseApp.firestore()

export default function Canvas(props){
  const { imgid } = props
  const [image, setImage] = useState(null)
  const [texts, setTexts] = useState([{}])
  const stageRef = useRef(null)

  useEffect(() => {
    const ref = storageRef.child(imgid + '.jpg')
    ref.getDownloadURL().then((url) => {
      const img = new Image()
      img.src = url
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        setImage(img)
      }
    })
    firestore.collection("images").doc(imgid).get().then(doc => {
      if(doc.exists){
        setTexts(doc.data().texts)
        setInsertText(doc.data().texts[0].defaultText)
      }
    })
  }, [imgid])

  const [insertText, setInsertText] = useState(texts[0].defaultText)
  const handleTextChange = e => {
    setInsertText(e.target.value)
  }

  (function(d,s,id){
    var js,
        fjs=d.getElementsByTagName(s)[0],
        p=/^http:/.test(d.location)?'http':'https';
    if(!d.getElementById(id)){
      js=d.createElement(s);
      js.id=id;
      js.src=p+'://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js,fjs);
    }
  })(document, 'script', 'twitter-wjs');

  //Twitterシェアボタン
  const tweet = async () => {
    const imgid = getUUID()
    const ref = storageRef.child('modifiedImages/' + imgid + '.jpg')
    console.log(stageRef.current.getStage())
    ref.put(stageRef.current.getStage().toDataURL())

    const href = `https://twitter.com/intent/tweet?hashtags=colarator&original_referer=${window.location.href}&ref_src=twsrc%5Etfw&text=Colarator&tw_p=tweetbutton&url=https%3A%2F%2Fcolarator.firebaseapp.com%2Fs%26imgid%3D${imgid}`
    window.open(href, 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1')
  }


  return (
    <React.Fragment>
      <Stage width={400} height={300} ref={stageRef}>
        <Layer>
          <KonvaImage image={image} x={0} y={0}></KonvaImage>
        </Layer>
        <Layer>
          <Text x={texts[0].x} y={texts[0].y} text={insertText} fill={texts[0].color} fontSize={30}/>
        </Layer>
      </Stage>
      <TextField
        label="テキスト"
        variant="outlined"
        value={insertText}
        onChange={handleTextChange}
        margin="normal"
        multiline
        autoFocus
      />
    <Button onClick={tweet} variant="contained">Tweet</Button>
    <a href="https://twitter.com/share" className="twitter-share-button" data-url="https://colarator.firebaseapp.com/s&imgid=aaa-aaa" data-text="" data-via="" data-size="default" data-related="" data-count="none" data-hashtags="colarator">Tweet</a>
    </React.Fragment>
  )
}
