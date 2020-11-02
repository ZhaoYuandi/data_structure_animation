window.onload = function () {
    var canvas = document.getElementById("canvas");

    //判断浏览器是否支持canvas
    if (canvas.getContext("2d")) {
        var context = canvas.getContext("2d");
    } else {
        alert("当前浏览器不支持canvas，请更换浏览器稍后再试")
    }
    //点击首页按钮进入介绍页面
    $("#backToHome").click(function () {
        $("#introduce").css("display","block");
        $("#showCase").css("background-color","rgba(255,255,255,0.8)");
        $("#exhibition").css("display","none");
    });
    //点击内容进入相关的展示页面
    // $(".nav-item").click(function () {
    //     $("#introduce").css("display","none");
    //     $("#showCase").css("background-color","rgba(255,255,255,1.0)");
    //     $("#exhibition").css("display","block");
    // });
    /*
    *****************************************顺序表***************************************************
    */
    $("#sqlistNav").click(function () {

        //解除之前已绑定的事件
        $('#optionFirst').unbind("click");
        $('#optionSecond').unbind("click");
        //绘图背景
        $("#introduce").css("display", "none");
        $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        $("#exhibition").css("display", "block");
        //具体操作
        console.log($("#optionFirst"));
        $("#optionFirst").text("插入");
        $("#optionSecond").text("删除");
        $("#optionSecond").removeClass("btn-primary");
        $("#optionSecond").addClass("btn-danger");
        //绘制操作
        var index = 0;
        context.clearRect(0,0,900,600);
        var Sqlist = [];


        //插入操作
        $("#optionFirst").click(function () {
            var pattern = /^(-)?\d+(\.\d+)?$/;

            if (Sqlist.length > 10){
                alert("表已满，不能再插入");
            } else if (pattern.exec($("#inputElement").val()) == null || $("#inputElement").val() == "") {
                //使用正则表达式判断输入的内容是否为数字
                alert("请输入正确的数字")
            }
            // else if( Sqlist.length === 0){
            //     //输入第一个数
            //     Sqlist[0] = parseInt($("#insertIuput").val());
            //     context.save();
            //     context.translate(62 * Sqlist.length,0);
            //     drawSqlist(context,Sqlist[0],"#FFFFFF");
            //     context.restore();
            //     //清空输入框
            //     $("#insertIuput").val("");
            // }
            else {
                //寻找要插入的位置
                var position = SqlistInFind(Sqlist,parseInt($("#inputElement").val()));
                console.log(position);
                //插入到指定位置
                Sqlist = SqlistInsert(Sqlist,position,parseInt($("#inputElement").val()));
                console.log(Sqlist);
                //清空输入框
                $("#inputElement").val("");

                //绘制操作
                //清空画布
                context.clearRect(0,0,900,600);
                //依次绘制
                for (var i = 0; i < Sqlist.length; i++){
                    context.save();
                    context.translate(62 * (i + 1),0);
                    if (i === position){
                        drawSqlist(context,Sqlist[i], "#FFFF00");
                    } else {
                        drawSqlist(context,Sqlist[i], "#FFFFFF");
                    }
                    context.restore();
                }
            }
        });
        //删除操作
        $("#optionSecond").click(function () {
            var pattern = /^(-)?\d+(\.\d+)?$/;
            console.log($("#inputElement").val());
            if (pattern.exec($("#inputElement").val()) == null || $("#inputElement").val() == ""){
                alert("请输入正确的待删除元素");
            } else if (Sqlist.length === 0){
                alert("当前表中没有元素，请先添加元素后进行删除操作");
            } else {
                //开始删除
                var canDelete = false;
                for (var i = 0; i < Sqlist.length; i++){
                    //判断是否可以进行操作
                    if(Sqlist[i] === parseInt($("#inputElement").val())){
                        Sqlist = SqlistDelete(Sqlist, parseInt($("#inputElement").val()), i);
                        canDelete = true;
                        //绘制元素
                        context.clearRect(0,0,900,600);
                        for (var j = 0; j < Sqlist.length; j++){
                            context.save();
                            context.translate(62 * (j + 1),0);
                            drawSqlist(context,Sqlist[j], "#FFFFFF");
                            context.restore();
                        }
                    }
                }
                if(canDelete === false){
                    alert("表中不存在该元素，请验证后再进行插入操作");
                }
                //清空输入框
                $("#inputElement").val("");
                console.log(Sqlist);
            }
        })
    })
    /*
    *****************************************链表***************************************************
    */
    $("#lnodeNav").click(function () {
        //解除之前已绑定的事件
        $('#optionFirst').unbind("click");
        $('#optionSecond').unbind("click");
        context.clearRect(0,0,900,600);
        //绘图背景
        $("#introduce").css("display", "none");
        $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        $("#exhibition").css("display", "block");
        //具体操作
        console.log($("#optionFirst"));
        $("#optionFirst").text("头插法");
        $("#optionSecond").text("尾插法");

        //头插法
        var LNode = [];
        //drawLnodeItem(context,40,400,80,40,1,"#444","#fff","head",1);
        LNode[0]="head";

        context.clearRect(0,0,1000,500);
        //创建image对象
        var img = new Image();


        //头插法
        $("#optionFirst").click(function () {
            //绘制图像
            context.clearRect(0,0,400,400);
            img.src='../components/img/LNodeHead.png';
            img.onload = function(){
                context.drawImage(img,450-img.width/2,40);
                console.log(img.width);
            };


            var pattern = /^[a-z]+$/;

            if (LNode.length > 10){
                alert("表已满，不能再插入");
                $("#insertLNode").val("");
            } else if (pattern.exec($("#inputElement").val()) == null || $("#inputElement").val() == "") {
                //使用正则表达式判断输入的内容是否为大写字母
                alert("请输入正确的字母");
                $("#inputElement").val("");
            }
            else {
                //绘制过渡动画
                //LNode=["dd","dee","efe"];

                var times=4;
                //设置定时器完成动画效果
                var clock = setInterval(function () {
                    context.clearRect(0,399,900,200);
                    drawLnodeItem(context,40,400,80,40,1,"#444","#fff",LNode[0],3);
                    context.save();
                    //绘制后边几个元素，隔开164像素的距离
                    context.translate(times,0);
                    for(var j=1;j<LNode.length;j++){
                        if(j === LNode.length - 1){
                            drawLnodeItem(context,204,400,80,40,1,"#444","#fff",LNode[j],1);
                        } else {
                            drawLnodeItem(context,204,400,80,40,1,"#444","#fff",LNode[j],0);
                        }
                        context.translate(164,0);
                    }
                    //绘制要加入的元素
                    context.restore();
                    context.clearRect(203,318+times/2-10,122,10);
                    drawLnodeItem(context,204,318+times/2,80,40,1,"#444","#FFFF00",$("#inputElement").val(),2);
                    context.clearRect(203-40,318+times/2,40,82);
                    drawLineArrow(context,154,420,204,318+times/2+20);
                    if(LNode.length!=1){
                        context.clearRect(204,318+times/2+40,80,40);
                        drawLineArrow(context,154+164,318+times/2+20,164+40+times,420);

                    }

                    times+=10;
                    if (times >= 174){
                        clearInterval(clock);
                    }
                },100);

                //绘制最终结果
                setTimeout(function () {
                    console.log(LNode);
                    for(var i=LNode.length-1;i>0;i--){
                        LNode[i+1]=LNode[i];
                    }
                    LNode[1]=$("#inputElement").val();
                    console.log($("#inputElement").val());
                    //开始绘制，首先清空画布
                    context.clearRect(0,399,900,600);
                    //context.translate(40,0);
                    context.save();
                    context.translate(40,0);
                    drawLnodeItem(context,0,400,80,40,1,"#444","#fff",LNode[0],4);
                    for(var j=1;j<LNode.length;j++){
                        context.translate(164,0);
                        console.log(j);
                        if(j === LNode.length - 1){
                            drawLnodeItem(context,0,400,80,40,1,"#444","#fff",LNode[j],1);
                        } else {
                            drawLnodeItem(context,0,400,80,40,1,"#444","#fff",LNode[j],0);
                        }

                    }
                    context.restore();
                    $("#inputElement").val("");
                },3000)



            }
            //
        });
        //尾插法
        $("#optionSecond").click(function () {
            //绘制图像
            context.clearRect(0,0,400,400);
            img.src='../components/img/LNodeTail.png';
            img.onload = function(){
                context.drawImage(img,450-img.width/2,40);
                console.log(img.width);
            }


            var pattern = /^[a-z]+$/;

            if (LNode.length > 10){
                alert("表已满，不能再插入");
                $("#inputElement").val("");
            } else if (pattern.exec($("#inputElement").val()) == null || $("#inputElement").val() == "") {
                //使用正则表达式判断输入的内容是否为大写字母
                alert("请输入正确的字母");
                $("#inputElement").val("");
            }
            else {
                var times=0;
                var clockLnode = setInterval(function () {
                    context.clearRect(0,399,900,200);
                    //依次绘制最后一个元素之前的所有元素
                    context.save();
                    console.log(LNode);
                    //此时数组里还没有刚获取到的值
                    for(var i=0;i<LNode.length;i++)
                    {
                        if (i===0){
                            if(LNode.length===1){
                                //是第一个元素
                                drawLnodeItem(context,40,400,80,40,1,"#444","#fff",LNode[i],3);
                            } else{
                                drawLnodeItem(context,40,400,80,40,1,"#444","#fff",LNode[i],4);
                            }
                        }else if(i === LNode.length - 1){
                            drawLnodeItem(context,40,400,80,40,1,"#444","#fff",LNode[i],2);
                        } else {
                            drawLnodeItem(context,40,400,80,40,1,"#444","#fff",LNode[i],0);
                        }
                        context.translate(164,0);
                    }
                    context.restore();
                    context.clearRect(204*(LNode.length),399,122,10);
                    drawLnodeItem(context,164*(LNode.length)+times,400,80,40,1,"#444","#FFFF00",$("#inputElement").val(),2);
                    //context.clearRect(164*(LNode.length)-40,499,40,40);
                    drawLineArrow(context,164*(LNode.length),400+20,164*(LNode.length)+times,400+20);
                    times+=5;
                    if (times >= 40){
                        clearInterval(clockLnode);
                    }
                },100);

                //绘制过渡动画
                setTimeout(function () {
                    LNode[LNode.length]=$("#inputElement").val();
                    console.log(LNode);
                    //开始绘制，首先清空画布
                    context.clearRect(0,399,900,600);
                    context.save();
                    context.translate(40,0);
                    drawLnodeItem(context,0,400,80,40,1,"#444","#fff",LNode[0],4);
                    for(var j=1;j<LNode.length;j++){
                        context.translate(164,0);
                        console.log(j);
                        if(j === LNode.length - 1){
                            drawLnodeItem(context,0,400,80,40,1,"#444","#fff",LNode[j],1);
                        } else {
                            drawLnodeItem(context,0,400,80,40,1,"#444","#fff",LNode[j],0);
                        }

                    }
                    context.restore();
                    $("#inputElement").val("");
                },3000);

            }
        })

    })

    /*
    *****************************************栈***************************************************
    */
    $("#stackNav").click(function () {
        //解除之前已绑定的事件
        $('#optionFirst').unbind("click");
        $('#optionSecond').unbind("click");
        context.clearRect(0,0,900,600);
        //绘图背景
        $("#introduce").css("display", "none");
        $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        $("#exhibition").css("display", "block");
        //具体操作
        console.log($("#optionFirst"));
        $("#optionFirst").text("入栈");
        $("#optionSecond").text("出栈");

        context.clearRect(0,0,1000,500);
        var img = new Image();
        var stack = [];
        //绘制栈的结构
        drawStackFinal(context,stack);

        $("#optionFirst").click(function () {
            if(stack.length>=10){
                alert("栈已满，不能再继续入栈操作！");
                $("#inputElement").val("");
            } else {
                //代码截图
                img.src='../components/img/stackIn.png';
                img.onload = function(){
                    context.drawImage(img,500,180);
                    console.log(img.width);
                };
                var drawTimes=0;
                var stackInInterval=setInterval(function () {
                    context.save();
                    //清空画布
                    context.clearRect(0,0,300,500);
                    //绘制当前的栈
                    drawStackFinal(context,stack);
                    //绘制元素
                    drawRect(context,100,50+40*drawTimes, 50, 40,1, '#fff', '#FF0', $("#inputElement").val(),"#000",5,25 );
                    //绘制箭头
                    drawLineArrow(context,200,75+drawTimes*40,160,75+drawTimes*40,'#000');
                    drawTimes+=1;
                    if (drawTimes > (10-stack.length)){
                        clearInterval(stackInInterval);
                    }
                    context.restore();
                },100);

                //绘制最终的结果
                setTimeout(function () {
                    stack[stack.length]=$("#inputElement").val();
                    drawStackFinal(context,stack);
                    drawLineArrow(context,200,75+40*(10-stack.length+1),160,75+40*(10-stack.length+1),'#000');
                    drawText(context,"25px 黑体","#ff0000","top",210,80+40*(10-stack.length+1));
                    $("#inputElement").val("");
                },3000)
            }
        });

        $("#optionSecond").click(function () {
            if(stack.length<=0){
                alert("栈已空，不能再继续出栈操作！");
                $("#inputElement").val("");
            } else {
                //代码截图
                img.src='../components/img/stackOut.png';
                img.onload = function(){
                    context.drawImage(img,500,180);
                    console.log(img.width);
                };
                var drawTimes=0;
                var outElement=stack[stack.length-1];
                stack.length--;
                var stackOutInterval=setInterval(function () {
                    context.save();
                    //清空画布
                    context.clearRect(0,0,300,500);
                    //绘制当前的栈
                    drawStackFinal(context,stack);
                    //绘制元素
                    drawRect(context,100,50+40*(10-stack.length)-40*drawTimes, 50, 40,1, '#fff', '#FF0', outElement,"#000",5,25 );
                    //绘制箭头
                    drawLineArrow(context,200,75+40*(10-stack.length)-40*drawTimes,160,75+40*(10-stack.length)-40*drawTimes,'#000');
                    drawTimes+=1;
                    if (drawTimes > (10-stack.length)){
                        clearInterval(stackOutInterval);
                    }
                    context.restore();
                },100);


                setTimeout(function () {
                    drawStackFinal(context,stack);
                    drawLineArrow(context,200,75+40*(10-stack.length+1),160,75+40*(10-stack.length+1),'#000');
                    drawText(context,"25px 黑体","#ff0000","top",210,80+40*(10-stack.length+1));
                    $("#inputElement").val("");
                },3000)
            }
        })

    })

    /*
    *****************************************队列***************************************************
    */
    $("#queueNav").click(function () {
        //解除之前已绑定的事件
        $('#optionFirst').unbind("click");
        $('#optionSecond').unbind("click");
        context.clearRect(0,0,900,600);
        //绘图背景
        $("#introduce").css("display", "none");
        $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        $("#exhibition").css("display", "block");
        //具体操作
        console.log($("#optionFirst"));
        $("#optionFirst").text("入队");
        $("#optionSecond").text("出队");

        context.clearRect(0,0,1000,500);
        var img = new Image();
        var queue = [];
        drawQueueFinal(context,queue);
        context.save();
        context.translate(250,250);
        context.rotate(-Math.PI/12);
        drawLineArrow(context,0,0,-100,0,"red");
        context.rotate(-Math.PI/12);
        drawLineArrow(context,0,0,-100,0,"blue");
        context.restore();


        var front=0;
        var rear=0;
        $("#optionFirst").click(function () {
            if(queue.length>=7){
                alert("队列已满，不能继续入队");
            } else if ($("#inputElement").val()==""){
                alert("请输入要加入的值");
            } else {
                //代码截图
                img.src='../components/img/queueIn.png';
                img.onload = function(){
                    context.drawImage(img,600,80);
                    console.log(img.width);
                };
                queue[queue.length]=$("#inputElement").val();
                rear++;
                if (rear===8){
                    rear=0;
                }
                //绘制队列的结构
                drawQueueFinal(context,queue,front);
                //绘制指针
                context.save();
                context.translate(250,250);
                context.rotate(Math.PI/4*front-Math.PI/12);
                drawLineArrow(context,0,0,-100,0,"red");
                context.restore();
                context.save();
                context.translate(250,250);
                context.rotate(Math.PI/4*rear-Math.PI/12);
                drawLineArrow(context,0,0,-100,0,"blue");
                context.restore();
                $("#inputElement").val("");
            }
        });

        $("#optionSecond").click(function () {
            if(queue.length<=0){
                alert("队列已空，不能继续出队");
            } else {
                //代码截图
                img.src='../components/img/queueOut.png';
                img.onload = function(){
                    context.drawImage(img,600,80);
                    console.log(img.width);
                };
                front++;
                if (front===8){
                    front=0;
                }
                for(var i=0;i<queue.length;i++){
                    queue[i]=queue[i+1];
                }
                queue.length--;
                //绘制队列的结构
                drawQueueFinal(context,queue,front);
                //绘制指针
                context.save();
                context.translate(250,250);
                context.rotate(Math.PI/4*front-Math.PI/6);
                drawLineArrow(context,0,0,-100,0,"red");
                context.restore();
                context.save();
                context.translate(250,250);
                context.rotate(Math.PI/4*rear-Math.PI/12);
                drawLineArrow(context,0,0,-100,0,"blue");
                context.restore();
                $("#inputElement").val("");
            }
        })
    })

    /*
    *****************************************树***************************************************
    */
    $("#treeNav").click(function () {
        // //解除之前已绑定的事件
        // $('#optionFirst').unbind("click");
        // $('#optionSecond').unbind("click");
        // context.clearRect(0,0,900,600);
        // //绘图背景
        // $("#introduce").css("display", "none");
        // $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        // $("#exhibition").css("display", "block");
        alert("提示：树的相关操作正在开发中，敬请期待。");

    });
    /*
    *****************************************图***************************************************
    */
    $("#graphNav").click(function () {
        // //解除之前已绑定的事件
        // $('#optionFirst').unbind("click");
        // $('#optionSecond').unbind("click");
        // context.clearRect(0,0,900,600);
        // //绘图背景
        // $("#introduce").css("display", "none");
        // $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        // $("#exhibition").css("display", "block");
        alert("提示：图的相关操作正在开发中，敬请期待。");
    });

    /*
     *****************************************排序***************************************************
     */
    /*
        直接插入排序
     */
    $("#insertSort").click(function () {
        //解除之前已绑定的事件
        $('#optionFirst').unbind("click");
        $('#optionSecond').unbind("click");
        context.clearRect(0,0,900,600);
        //绘图背景
        $("#introduce").css("display", "none");
        $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        $("#exhibition").css("display", "block");
        //具体操作
        console.log($("#optionFirst"));
        $("#optionFirst").text("插入");
        $("#optionSecond").text("排序");

        var array = [];
        var times=0;
        drawInsertSort(context,array,-1);
        context.clearRect(0,0,1000,500);
        //插入操作
        $("#optionFirst").click(function () {
            var pattern = /^(-)?\d+(\.\d+)?$/;
            if(array.length>=10){
                alert("警告：为保证演示质量，默认最多添加10个元素");
            } else if (pattern.exec($("#inputElement").val()) == null||$("#inputElement").val()==""){
                alert("请输入正确的数字");
            } else {
                array[array.length]=$("#inputElement").val();
                drawInsertSort(context,array,0,times,false);
                //将数组中字符类型转换为数字类型
                for(var i=0;i<array.length;i++){
                    array[i]=parseInt(array[i]);
                }
                $("#inputElement").val("");
            }
        });

        //排序操作
        $("#optionSecond").click(function () {
            var i,j,temp;
            i=1;
            var insertSortInterval=setInterval(function () {
                temp=array[i];
                j=i-1;
                while(j>=0&&temp<array[j]){
                    array[j+1]=array[j];
                    j--;
                }
                array[j+1]=temp;
                console.log(array);
                drawInsertSort(context,array,j+1,++times,true);
                i++;
                if(i>=array.length)
                    clearInterval(insertSortInterval);
            },1000);
        })
    });

    /*
       冒泡排序
    */
    $("#bubbleSort").click(function () {
        //解除之前已绑定的事件
        $('#optionFirst').unbind("click");
        $('#optionSecond').unbind("click");
        context.clearRect(0,0,900,600);
        //绘图背景
        $("#introduce").css("display", "none");
        $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        $("#exhibition").css("display", "block");
        //具体操作
        console.log($("#optionFirst"));
        $("#optionFirst").text("插入");
        $("#optionSecond").text("排序");

        var array = [];
        var times=0;
        drawBubbleSort(context,array,-1);

        //插入操作
        $("#optionFirst").click(function () {
            var pattern = /^(-)?\d+(\.\d+)?$/;
            if(array.length>=8){
                alert("警告：为保证演示质量，默认最多添加8个元素");
            } else if (pattern.exec($("#inputElement").val()) == null||$("#inputElement").val()==""){
                alert("请输入正确的数字");
            } else {
                array[array.length]=$("#inputElement").val();
                drawBubbleSort(context,array,-1,times,false);
                //将数组中字符类型转换为数字类型
                for(var i=0;i<array.length;i++){
                    array[i]=parseInt(array[i]);
                }
                $("#inputElement").val("");
            }
        });

        //排序操作
        $("#optionSecond").click(function () {
            //每排序一次清空一次画布
            context.clearRect(0,0,1000,500);
            drawBubbleSort(context,array,-1,times,false);
            var i,j,temp,flag;
            i=0;
            var bubbleSortInterval=setInterval(function () {
                flag=0;
                for(j=0;j<array.length-i-1;j++)
                {
                    if(array[j]>array[j+1])
                    {
                        temp=array[j];
                        array[j]=array[j+1];
                        array[j+1]=temp;
                        flag=1;
                    }
                }
                if (flag===0)
                    clearInterval(bubbleSortInterval);
                drawBubbleSort(context,array,j,i+1,true);
                i++;
                if(i>=array.length)
                    clearInterval(bubbleSortInterval);
            },1000);

        })



    });

    /*
       选择排序
    */
    $("#selectSort").click(function () {
        //解除之前已绑定的事件
        $('#optionFirst').unbind("click");
        $('#optionSecond').unbind("click");
        context.clearRect(0,0,900,600);
        //绘图背景
        $("#introduce").css("display", "none");
        $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        $("#exhibition").css("display", "block");
        //具体操作
        console.log($("#optionFirst"));
        $("#optionFirst").text("插入");
        $("#optionSecond").text("排序");

        var array = [];
        var times=0;
        drawSelectSort(context,array,-1);

        //插入操作
        $("#optionFirst").click(function () {
            var pattern = /^(-)?\d+(\.\d+)?$/;
            if(array.length>=10){
                alert("警告：为保证演示质量，默认最多添加10个元素");
            } else if (pattern.exec($("#inputElement").val()) == null||$("#inputElement").val()==""){
                alert("请输入正确的数字");
            } else {
                array[array.length]=$("#inputElement").val();
                drawSelectSort(context,array,-1,times,false);
                //将数组中字符类型转换为数字类型
                for(var i=0;i<array.length;i++){
                    array[i]=parseInt(array[i]);
                }
                $("#inputElement").val("");
            }
        });

        $("#optionSecond").click(function () {
            //每排序一次清空一次画布
            context.clearRect(0,0,1000,500);
            drawSelectSort(context,array,-1,times,false);
            var i,j,temp,k;
            i=0;
            var selectSortInterval=setInterval(function () {
                k=i;
                for(j=i+1;j<array.length;j++)
                {
                    console.log(j);
                    if(array[k]>array[j]){
                        k=j;
                        //console.log("23");
                    }
                }
                console.log(array);
                if (i!==k){
                    temp=array[i];
                    array[i]=array[k];
                    array[k]=temp;
                }
                console.log(array);
                drawSelectSort(context,array,i,i+1,true);
                i++;
                if (i>=array.length)
                    clearInterval(selectSortInterval);
            },1000);
            // for(i=0;i<array.length;i++){
            //     k=i;
            //     for(j=i+1;j<array.length;j++)
            //     {
            //         console.log(j);
            //         if(array[k]>array[j]){
            //             k=j;
            //             //console.log("23");
            //         }
            //     }
            //     console.log(array);
            //     if (i!==k){
            //         temp=array[i];
            //         array[i]=array[k];
            //         array[k]=temp;
            //     }
            //     console.log(array);
            //     drawSelectSort(context,array,i,i+1,true);
            // }

        })



    })
    /*
    *****************************************查找***************************************************
     */
    /*
        顺序查找
     */
    $("#orderSearch").click(function () {
        //解除之前已绑定的事件
        $('#optionFirst').unbind("click");
        $('#optionSecond').unbind("click");
        context.clearRect(0,0,900,600);
        //绘图背景
        $("#introduce").css("display", "none");
        $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        $("#exhibition").css("display", "block");
        //具体操作
        console.log($("#optionFirst"));
        $("#optionFirst").text("插入");
        $("#optionSecond").text("查找");

        var array = [];
        drawInsertSort(context,array,-1);

        //插入操作
        $("#optionFirst").click(function () {
            var pattern = /^(-)?\d+(\.\d+)?$/;
            if(array.length>=10){
                alert("警告：为保证演示质量，默认最多添加10个元素");
            } else if (pattern.exec($("#inputElement").val()) == null||$("#inputElement").val()==""){
                alert("请输入正确的数字");
            } else {
                array[array.length]=$("#inputElement").val();
                drawSearchArrray(context,array,-1);
                //将数组中字符类型转换为数字类型
                for(var i=0;i<array.length;i++){
                    array[i]=parseInt(array[i]);
                }
                $("#inputElement").val("");
            }
        });

        $("#optionSecond").click(function () {
            //每排序一次清空一次画布
            context.clearRect(0,0,1000,500);
            drawSearchArrray(context,array,-1);
            var pattern = /^(-)?\d+(\.\d+)?$/;
            if (pattern.exec($("#inputElement").val()) == null||$("#inputElement").val()=="") {
                alert("请输入正确的数字");
            } else {
                var i=0;
                var searchItem=parseInt($("#inputElement").val());
                var flag=0;
                var orderSearchTimer=setInterval(function () {
                    if (flag===0){
                        context.clearRect(0,0,1000,500);
                        if (array[i]!==searchItem){
                            drawSearchArrray(context,array,-1);
                            drawSearchItem(context,searchItem,50+i*75,150,"#fff","#0000ff");
                        } else {
                            drawSearchArrray(context,array,i);
                            drawSearchItem(context,searchItem,50+i*75,150,"#ffff00","#ff0000");
                            flag=1;
                            //alert("查找成功"+searchItem+"是当前数组中的第"+i+"号元素");
                            //clearInterval(orderSearchTimer);
                        }
                        i++;
                        if(i>array.length){
                            flag=2;
                        }
                    } else if(flag===1){
                        alert("查找成功,"+searchItem+"是当前数组中的第"+i+"号元素");
                        clearInterval(orderSearchTimer);
                    } else {
                        alert("查找失败，当前数组中不存在值为"+searchItem+"的元素");
                        context.clearRect(0,0,1000,500);
                        drawSearchArrray(context,array,-1);
                        clearInterval(orderSearchTimer);
                    }

                },1000);
            }
            $("#inputElement").val("");
        })



    })
    /*
        折半查找
     */
    $("#binSearch").click(function () {
        //解除之前已绑定的事件
        $('#optionFirst').unbind("click");
        $('#optionSecond').unbind("click");
        context.clearRect(0,0,900,600);
        //绘图背景
        $("#introduce").css("display", "none");
        $("#showCase").css("background-color", "rgba(255,255,255,1.0)");
        $("#exhibition").css("display", "block");
        //具体操作
        console.log($("#optionFirst"));
        $("#optionFirst").text("插入");
        $("#optionSecond").text("查找");

        var array = [];
        var index=0;
        drawInsertSort(context,array,-1);

        //插入操作
        $("#optionFirst").click(function () {
            var pattern = /^(-)?\d+(\.\d+)?$/;
            if(index>0){
                console.log(parseInt($("#inputElement").val())<array[index-1]);
            }
            if(array.length>=14){
                alert("警告：为保证演示质量，默认最多添加14个元素");
            } else if (pattern.exec($("#inputElement").val()) == null||$("#inputElement").val()==""){
                alert("请输入正确的数字");
            } else if((index>0)&&(parseInt($("#inputElement").val())<array[index-1])){
                alert("请有序插入数字，本系统采用递增序列！");
            } else {
                index++;
                array[array.length]=$("#inputElement").val();
                drawBinSearchArrray(context,array,-1,-1,-1,-1);
                //将数组中字符类型转换为数字类型
                for(var i=0;i<array.length;i++){
                    array[i]=parseInt(array[i]);
                }
                $("#inputElement").val("");
            }


        });

        $("#optionSecond").click(function () {
            //每排序一次清空一次画布
            context.clearRect(0,0,1000,500);
            drawBinSearchArrray(context,array,-1,-1,-1,-1);
            var pattern = /^(-)?\d+(\.\d+)?$/;
            if (pattern.exec($("#inputElement").val()) == null||$("#inputElement").val()=="") {
                alert("请输入正确的数字");
            } else {
                //设置从数组的中间开始
                var i,j,mid;
                mid=parseInt(array.length/2);
                i=0;
                j=array.length-1;
                var searchItem=parseInt($("#inputElement").val());
                var flag=0;
                var orderSearchTimer=setInterval(function () {
                    if (flag===0){
                        context.clearRect(0,0,1000,500);
                        drawBinSearchArrray(context,array,-1,i,j,mid);
                        drawSearchItem(context,searchItem,50+mid*75,200,"#fff","#0000ff");
                        if(i>j){
                            // 查找失败
                            flag=2;
                        }
                        else if (searchItem<array[mid]){
                            //要查找的元素在中间元素之前
                            j=mid-1;
                            mid=parseInt((i+j)/2);
                        } else if (searchItem>array[mid]){
                            //要找的元素在中间元素之前
                            i=mid+1;
                            mid=parseInt((i+j)/2);
                        } else {
                            //查找成功
                            context.clearRect(0,0,1000,500);
                            drawBinSearchArrray(context,array,-1,i,j,mid);
                            drawSearchItem(context,searchItem,50+mid*75,200,"#ffff00","#ff0000");
                            flag=1;
                        }
                    } else if(flag===1){
                        alert("查找成功,"+searchItem+"是当前数组中的第"+mid+"号元素");
                        clearInterval(orderSearchTimer);
                    } else {
                        alert("查找失败，当前数组中不存在值为"+searchItem+"的元素");
                        context.clearRect(0,0,1000,500);
                        drawBinSearchArrray(context,array,mid,i,j,mid);
                        clearInterval(orderSearchTimer);
                    }

                },1000);

            }
            $("#inputElement").val("");
        })

    });


};
