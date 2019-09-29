import firebase from 'firebase/app'
import firebaseApp from './firebaseSetup.js'
import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import Konva from 'konva';

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

import getUUID from './uuid.js'

const storageRef = firebaseApp.storage().ref()
const firestore = firebaseApp.firestore()

function useForceUpdate(){
  const [state, setState] = useState(0)
  return [state, () => setState(prev => prev+1)]
}

export default function Canvas(props){
  const [imgPath, setImgPath] = useState("")
  const [image, setImage] = useState(null)
  // const [forceState, forceUpdate] = useForceUpdate(0)

  const handleChangeFile = (e) => {
    const files = e.target.files;
    const imgPath = window.URL.createObjectURL(files[0]);
    setImgPath(imgPath);
  }

  const canvas = useRef(null)

  useEffect(() => {
    if(imgPath !== ""){
      const img = new Image()
      img.src = imgPath
      img.onload = (e) => {
        console.log(img)
        setImage(img)
        // // console.log(img.naturalWidth)
        // ctx.drawImage(img, 0, 0)
      }
    }
  },[imgPath])

  // const handleClick = async () => {
  //   const uuid = getUUID()
  //   //ストレージに保存
  //   const sRef = storageRef.child(uuid + '.jpg')
  //   await sRef.putString(canvas.current.toDataURL())
  //   //データベースに保存
  //   await firestore.collection("images").doc(uuid).set({
  //     tags:[],
  //     texts:[
  //       {
  //         x:0,
  //         y:0,
  //         width:100,
  //         height:50,
  //         defaultText:"Hello",
  //         color:"red",
  //         font: "",
  //       }
  //     ],
  //     createdAt:firebase.firestore.FieldValue.serverTimestamp(),
  //   })
  // }

  // const [text, setText] = useState("")
  // const handleChange = e => {
  //   setText(e.target.value)
  // }

  // const [textboxes, setTextboxes] = useState([])
  // const insertText = () => {
  //   setTextboxes(array => {
  //     return [...array,
  //       {
  //         x:0,
  //         y:0,
  //         // width:0,
  //         // height:0,
  //         value:text,
  //         color:"red",
  //         font: "ＭＳ ゴシック",
  //       }
  //     ]
  //   })
  //   setText("")
  // }

  // const selectedTextData = useRef({textId:null, originX:null, originY:null})

  // useEffect(() => {
  //   if(canvas.current == null) return
  //   const ctx = canvas.current.getContext('2d')
  //   textboxes.forEach(text => {
  //     let width = 0
  //     text.value.split("\n").forEach((value, i) =>{
  //       ctx.font = `30px '${text.font}'`
  //       width = Math.max(width, ctx.measureText(value).width)
  //       ctx.fillStyle = text.color
  //       ctx.textBaseline = "top"
  //       ctx.fillText(value, text.x, text.y + 30 * i);
  //     })
  //     text.width = width
  //     text.height = 30 * text.value.split("\n").length
  //
  //     ctx.strokeRect(text.x, text.y, text.width, text.height);
  //   })
  // }, [textboxes, forceState])

  // const handleEvent = type => e => {
  //   switch (type) {
  //     case "down":{
  //         const cX = e.nativeEvent.offsetX
  //         const cY = e.nativeEvent.offsetY
  //         const selectedTextId = textboxes.findIndex(({x, y, width, height}) => {
  //           return x <= cX && cX <= x + width && y <= cY && cY <= y + height
  //         })
  //         selectedTextData.current = {
  //           textId: selectedTextId >= 0 ? selectedTextId : null,
  //           originX:cX,
  //           originY:cY,
  //         }
  //         console.log(selectedTextData)
  //       }
  //       break;
  //     case "move":
  //         if(selectedTextData.current.textId == null) return
  //         textboxes[selectedTextData.current.textId].x += e.nativeEvent.offsetX - selectedTextData.current.originX
  //         textboxes[selectedTextData.current.textId].y += e.nativeEvent.offsetY - selectedTextData.current.originY
  //         selectedTextData.current.originX = textboxes[selectedTextData.current.textId].x
  //         selectedTextData.current.originY = textboxes[selectedTextData.current.textId].x
  //         forceUpdate()
  //       break;
  //     case "up":
  //         // selectedTextData.current = {text:null, originX:null, originY:null}
  //       break;
  //     default:
  //
  //   }
  // }

  const [insertText, setInsertText] = useState("")
  const handleTextChange = e => {
    setInsertText(e.target.value)
  }

  return (
    <React.Fragment>
      {
        imgPath !== "" ? (
          <React.Fragment>
            <Stage width={400} height={300}>
              <Layer>
                <KonvaImage image={image} x={0} y={0}></KonvaImage>
              </Layer>
              <Layer>
                <Text x={0} y={0} text={insertText} fill="skyblue" fontSize={30}/>
              </Layer>
            </Stage>
          </React.Fragment>
        ):(
          <Button variant="outlined">
            <input type="file" onChange={handleChangeFile} className="inputFileBtnHide"/>
          </Button>
        )
      }
    </React.Fragment>
  )
}
