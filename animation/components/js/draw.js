/*
***********************************************公用函数************************************************
 */
//绘制矩形的函数
function drawRect(cxt,x,y, width, height,borderWidth, borderColor, fillColor, content,fontColor,deviationX,deviationY ){
    cxt.beginPath();
    //rect函数直接创建矩形
    cxt.rect(x,y, width, height);
    cxt.lineWidth = borderWidth;
    cxt.fillStyle = fillColor;
    cxt.strokeStyle = borderColor;

    cxt.fill();
    cxt.stroke();
    cxt.closePath();

    //绘制矩形的内容
    cxt.beginPath();
    cxt.font = "bold 20px Arial";
    ///实心
    cxt.fillStyle = fontColor;
    cxt.fillText(content, x+deviationX, y+deviationY);
    cxt.beginPath();

}
//绘制箭头的函数
function drawLineArrow(cxt, fromX, fromY, toX, toY, color) {
    //参数:画布，起始位置横坐标，起始位置纵坐标，终止位置横坐标，终止位置纵坐标，
    //填充色
    var headlen = 15;//箭头线的长度
    var theta = 45;//箭头线与直线的夹角
    var arrowX, arrowY;//箭头线终点坐标
    // 计算各角度和对应的箭头终点坐标
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI;
    var angle1 = (angle + theta) * Math.PI / 180;
    var angle2 = (angle - theta) * Math.PI / 180;
    var topX = headlen * Math.cos(angle1);
    var topY = headlen * Math.sin(angle1);
    var botX = headlen * Math.cos(angle2);
    var botY = headlen * Math.sin(angle2);
    cxt.beginPath();
    //画直线
    cxt.moveTo(fromX, fromY);
    cxt.lineTo(toX, toY);

    arrowX = toX + topX;
    arrowY = toY + topY;
    //画上边箭头线
    cxt.moveTo(arrowX, arrowY);
    cxt.lineTo(toX, toY);

    arrowX = toX + botX;
    arrowY = toY + botY;
    //画下边箭头线
    cxt.lineTo(arrowX, arrowY);

    cxt.strokeStyle = color;
    cxt.stroke();
}
//绘制圆形的函数
function drawCircle(cxt,x,y,radius,borderWidth,borderColor,fillColor) {
    cxt.lineWidth = borderWidth;
    cxt.fillStyle = fillColor;
    cxt.strokeStyle = borderColor;
    cxt.beginPath();
    cxt.arc(x,y,radius,0,Math.PI*2,true);
    cxt.closePath();
    cxt.stroke();

    cxt.fill();
}
//时间静止毫秒函数
function pauseTime(millTime) {
    var start=Date.now();
    while(true){
        var nowTime=Date.now();
        var offset=nowTime-start;
        if(offset>=millTime)
            break;
    }
}
//绘制文字的函数
function drawText(cxt,font,color,text,x,y){
    cxt.save();
    cxt.font=font;
    cxt.fillStyle=color;
    cxt.fillText(text,x,y);
    cxt.restore();
}

/*
 ************************************************线性表*************************************************
 */
//绘制顺序表的函数
function drawSqlist(cxt, value, fillColor){
    drawRect(cxt, 40, 400, 60, 30, 1, '#000',fillColor, value,'#000',10,20);
}
//顺序表插入的函数
function SqlistInsert(a, p, x) {
    for (var i = a.length - 1; i >= p; i--) {
        a[i + 1] = a[i];
    }
    a[p] = x;
    return a;
}
//顺序表删除的函数
function SqlistDelete(a, x, p) {
    for (var j = p; j < a.length - 1; j++) {
        a[j] = a[j + 1];
    }
    --(a.length);
    return a;

}

//顺序表查找的函数
function SqlistInFind(a, x) {
    for (var i = 0; i < a.length; i++){
        if (x < a[i]){
            return i;
        }
    }
    return i;
}
//顺序表插入的函数
function SqlistInsert(a, p, x) {
    for (var i = a.length - 1; i >= p; i--) {
        a[i + 1] = a[i];
    }
    a[p] = x;
    return a;
}
//顺序表删除的函数
function SqlistDelete(a, x, p) {
    for (var j = p; j < a.length - 1; j++) {
        a[j] = a[j + 1];
    }
    --(a.length);
    return a;
}
//绘制单链表结点的函数
function drawLnodeItem(cxt,x,y,width,height,borderWidth,borderColor,fillColor,content,index){
    //pos==0代表其他，pos==1，pos==2代表正在绘制过程中代表最后一个,pos=3代表头借节点
    if(index===0) {
        //普通节点
        drawRect(cxt, x, y, width, height, borderWidth, borderColor, fillColor, content,"#000",15,25);
        drawRect(cxt, x+width, y, width/2, height, borderWidth, borderColor, fillColor, ' ',"#000",15,25);
        drawLineArrow(cxt, x+width+width/2-10, y+height/2, x+width+width/2+40,y+height/2 , "#000");
    } else if(index === 1)  {
        drawRect(cxt,x,y, width, height,borderWidth, borderColor, fillColor, content,"#000",15,25 );
        drawRect(cxt,x+width,y, width/2, height,borderWidth, borderColor, fillColor, 'ʌ' ,"#000",15,25);
    } else if(index === 2) {
        drawRect(cxt, x, y, width, height, borderWidth, borderColor, fillColor, content,"#000",15,25);
        drawRect(cxt, x+width, y, width/2, height, borderWidth, borderColor, fillColor, ' ',"#000",15,25);
    } else if (index === 3) {
        drawRect(cxt, x, y, width*3/2, height, borderWidth, borderColor, fillColor, content,"#000",20,25);
    } else if (index === 4){
        drawRect(cxt, x, y, width*3/2, height, borderWidth, borderColor, fillColor, content,"#000",20,25);
        drawLineArrow(cxt, x+width+width/2-10, y+height/2, x+width+width/2+40,y+height/2 , "#000");
    }

}

/*
 ************************************************栈*************************************************
 */
//绘制栈最终结果的函数
function drawStackFinal(context,stack) {
    context.clearRect(0,0,300,500);
    context.save();
    var i;
    for(i=0;i<stack.length;i++){
        console.log(stack[i]);
        drawRect(context,100,450-40*i, 50, 40,1, '#000', '#fff', stack[i],"#000",5,25 );
    }
    for(;i<10;i++){
        drawRect(context,100,450-40*i, 50, 40,1, '#000', '#fff', " ","000",5,25 );
    }
    context.restore();
}
/*
 **********************************************队列*************************************************
 */
//绘制队列最终结果的函数
function drawQueueFinal(context,queue,index) {
    context.clearRect(0,0,300,500);

    context.save();
    //绘制循环队列的圆
    drawCircle(context,250,250,200,5,"#000","#fff");
    drawCircle(context,250,250,100,5,"#000","#fff");
    drawCircle(context,250,250,5,5,"#000","#000");
    context.strokeStyle="#000";
    context.lineWidth="2";
    //绘制八条线
    context.moveTo(150,250);
    context.lineTo(50,250);
    context.stroke();
    context.moveTo(250-50*Math.sqrt(2),250-50*Math.sqrt(2));
    context.lineTo(250-100*Math.sqrt(2),250-100*Math.sqrt(2));
    context.stroke();
    context.moveTo(250,150);
    context.lineTo(250,50);
    context.stroke();
    context.moveTo(250+50*Math.sqrt(2),250-50*Math.sqrt(2));
    context.lineTo(250+100*Math.sqrt(2),250-100*Math.sqrt(2));
    context.stroke();
    context.moveTo(350,250);
    context.lineTo(450,250);
    context.stroke();
    context.moveTo(250+50*Math.sqrt(2),250+50*Math.sqrt(2));
    context.lineTo(250+100*Math.sqrt(2),250+100*Math.sqrt(2));
    context.stroke();
    context.moveTo(250,350);
    context.lineTo(250,450);
    context.stroke();
    context.moveTo(250-50*Math.sqrt(2),250+50*Math.sqrt(2));
    context.lineTo(250-100*Math.sqrt(2),250+100*Math.sqrt(2));
    context.stroke();
    context.restore();
    //绘制标示线

    var xWord=[100,200,300,400,400,300,200,100];
    var yWord=[200,100,100,200,300,400,400,300];
    context.fillStyle="#000";
    context.font="bold 20px Arial";
    context.textAlign="center";
    console.log(index);

    for(var i=0;i<queue.length;i++){
        if(index+i>7){
            index-=8;
        }
        context.fillText(queue[i],xWord[i+index],yWord[i+index],60);
    }
    drawLineArrow(context,600,350,650,350,"red");
    context.fillText("front",680,360,60);
    drawLineArrow(context,600,380,650,380,"blue");
    context.fillText("rear",680,390,60);
}
/*
 **********************************************排序*************************************************
 */
//绘制排序最终结果的函数
/*
   直接撤入排序
 */
function drawInsertSort(context,array,index,times,arrow) {
    //context.clearRect(0,0,1000,600);
    context.save();
    for(var i=0;i<array.length;i++) {
        if (i > times) {
            drawRect(context, 50+times*100, 50 + 50*i, 50, 40, 1, '#000', '#fff', array[i], "#000", 15, 25);
        } else {
            drawRect(context, 50 + times * 100, 50 + 50 * i, 50, 40, 1, '#000', '#ff0', array[i], "#000", 15, 25);
        }
    }
    if(arrow){
        drawLineArrow(context,50+times*100-40,50+50*array.length/2,50+times*100-10,50+50*array.length/2,'#f00');
    }

    context.restore();
}
/*
   冒泡排序
 */
function drawBubbleSort(context,array,index,times,arrow) {
    //context.clearRect(0,0,1000,600);
    context.save();
    for(var i=0;i<array.length;i++) {
        if (i !== index) {
            drawRect(context, 50+times*100, 50 + 50*i, 50, 40, 1, '#000', '#fff', array[i], "#000", 15, 25);
        } else {
            drawRect(context, 50 + times * 100, 50 + 50 * i, 50, 40, 1, '#000', '#ff0', array[i], "#000", 15, 25);
        }
    }
    if(arrow){
        drawLineArrow(context,50+times*100-40,50+50*array.length/2,50+times*100-10,50+50*array.length/2,'#f00');
    }

    context.restore();
}
/*
    简单选择排序
 */
function drawSelectSort(context,array,index,times,arrow) {
    //context.clearRect(0,0,1000,600);
    context.save();
    for(var i=0;i<array.length;i++) {
        if (i !== index) {
            drawRect(context, 50+times*100, 50 + 50*i, 50, 40, 1, '#000', '#fff', array[i], "#000", 15, 25);
        } else {
            drawRect(context, 50 + times * 100, 50 + 50 * i, 50, 40, 1, '#000', '#ff0', array[i], "#000", 15, 25);
        }
    }
    if(arrow){
        drawLineArrow(context,50+times*100-40,50+50*array.length/2,50+times*100-10,50+50*array.length/2,'#f00');
    }

    context.restore();
}
/*
 **********************************************查找*************************************************
 */
//绘制待查找数组的函数
function drawSearchArrray(context,array,index) {
    //index表示查找到的最终数据
    context.save();
    for(var i=0;i<array.length;i++) {
        if (i !== index) {
            drawRect(context, 50+75*i, 50, 50, 40, 1, '#000', '#fff', array[i], "#000", 10, 25);
        } else {
            drawRect(context, 50+75*i, 50, 50, 40, 1, '#000', '#ff0', array[i], "#000", 10, 25);
        }
    }
    context.restore();
}
/*
   查找单元
 */
function drawSearchItem(context,item,x,y,color,arrowColor) {
    context.save();
    drawRect(context, x, y, 50, 40, 1, '#000', color,item, "#000", 5, 25);
    drawLineArrow(context,x+25,y-10,x+25,y-50,arrowColor);
    context.restore();
}
//二分查找
function drawBinSearchArrray(context,array,index,low,high,mid) {
    //index表示查找到的最终数据
    context.save();
    for(var i=0;i<array.length;i++) {
        if (i !== index) {
            drawRect(context, 50+75*i, 100, 50, 40, 1, '#000', '#fff', array[i], "#000", 10, 25);
        } else {
            drawRect(context, 50+75*i, 100, 50, 40, 1, '#000', '#ff0', array[i], "#000", 10, 25);
        }
    }
    if(low!==-1){
        drawLineArrow(context,75+75*low,50,75+75*low,90,"#f00");
        drawText(context,"12px","#ff0","low",60+75*low,45);
        drawLineArrow(context,75+75*mid,50,75+75*mid,90,"#f00");
        drawText(context,"12px","#ff0","mid",60+75*mid,45);
        drawLineArrow(context,75+75*high,50,75+75*high,90,"#f00");
        drawText(context,"12px","#ff0","high",60+75*high,45);
    }

    context.restore();
}