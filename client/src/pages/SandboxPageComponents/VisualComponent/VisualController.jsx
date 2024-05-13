import React, { useEffect } from 'react';
import Konva from 'konva';
import { frame } from 'framer-motion';
//TODO: Hay que aplicarle un style a las letras
const VisualComponent = () => {
  useEffect(() => {
    var stage = new Konva.Stage({
      container: 'container',
      width: 1260,
      height: 350,
      fill: '#ddd',
    });

    var layer = new Konva.Layer();
    var layer2 = new Konva.Layer();

    var simpleText = new Konva.Text({
      x: stage.width() / 2,
      y: 15,
      text: 'Simple Text',
      fontSize: 30,
      fontFamily: 'Calibri',
    });

    simpleText.offsetX(simpleText.width() / 2);

    var complexText = new Konva.Text({
      x: 20,
      y: 60,
      text: "COMPLEX TEXT\n\nAll the world's a stage, and all the men and women merely players. They have their exits and their entrances.",
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 300,
      padding: 20,
      align: 'center',
    });

    var rect = new Konva.Rect({
      x: 20,
      y: 60,
      stroke: '#555',
      strokeWidth: 5,
      fill: '#ddd',
      width: 300,
      height: complexText.height(),
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.2,
      cornerRadius: 10,
    });

    var rect2 = new Konva.Rect({
        x: 0,
        y: 0,
        stroke: '#555',
        strokeWidth: 1,
        fill: '#ddd',
        width: stage.width(),
        height: stage.height(),
        cornerRadius: 10,
      });

    layer.add(simpleText);
    layer.add(rect);
    layer.add(complexText);
    layer2.add(rect2);

    stage.add(layer2);
    stage.add(layer);
  }, []);

  return <div id="container"></div>;
};

export default VisualComponent;