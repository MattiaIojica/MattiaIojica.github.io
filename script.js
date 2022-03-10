'use strict'
$(document).ready(function(){

    var count = 0;
    var sc = 0, bsc = 0;
    var score = [...document.querySelectorAll('[type = number]')];
    var best_score = [...document.querySelectorAll('[type = bestsc]')];
    var last = -1;
    var random_color, random_number;
    var circles;
    var n = 2;
    const btnNew = document.getElementById("newgame");       
    const btnNewModal = document.getElementById("newgame-modal");       
    const sett = document.getElementById("sett");
    const mod = document.getElementById('modal1');
    const modal2 = document.getElementById('modal2');
    const span = document.getElementsByClassName('close');
    const bd = document.querySelector('div');
    const ma = document.querySelector('main');
    const switch1 = document.getElementById('sw1');
    const switch2 = document.getElementById('sw2');
    mod.style.display = "none";
    modal2.style.display = "none";
    // sett_img = document.getElementById("sett");



    var color_true = [
                        '#c76b6b', '#c4c464', '#7C483D', '#262A74', "#611968", '#A90E34',
                        '#444E86', '#c76b6b', '#c4c464', '#7C483D', '#262A74', "#611968", 
                        '#A90E34', '#444E86', '#1A51E1'];

    var color_false = [
                        '#a63f3f', '#94c464', '#572E25', '#15173F', '#9718A4', '#BB4A65',
                        '#0E1747', '#a63f3f', '#94c464', '#572E25', '#15173F', '#9718A4',
                        '#BB4A65', '#0E1747', '#4C6DC2'];

    var hard_colors_t = [
                        '#1A51E1', '#27AB9C', '#AF9595', '#BC8F8F', '#66CD00', '#209E87',
                        '#FFA200', '#B9FC00', '#AD00FE', '#0086EC', '#20429E', '#22857A', 
                        '#8B6969', '#CFAFAF', '#95FF2B', '#18C5A5', '#DD8D01', '#A4DF00', 
                        '#A000EC', '#0A8EF3'];

    var hard_colors_f = [
                        '#20429E', '#22857A', '#8B6969', '#CFAFAF', '#95FF2B', '#18C5A5',
                        '#DD8D01', '#A4DF00', '#A000EC', '#0A8EF3', '#1A51E1', '#27AB9C', 
                        '#AF9595', '#BC8F8F', '#66CD00', '#209E87', '#FFA200', '#B9FC00', 
                        '#AD00FE', '#0086EC'];


    
    var data = [{
            "x": 128,
            "y": 128,
            "radius": 127,
            "id": count++
        },
        {
            "x": 384,
            "y": 128,
            "radius": 127,
            "id": count++
        },
        {
            "x": 128,
            "y": 384,
            "radius": 127,
            "id": count++

        }
        ,
        {
            "x": 384,
            "y": 384,
            "radius": 127,
            "id": count++
        }
    ];





    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    
    
    
    function newColor(){
        
        random_number = getRndInteger(0, data.length);
        random_color;

        if(sc < 11)
        {

            do{
                random_color = getRndInteger(0, color_false.length);
            }while(last == random_color);
        }
        else
        {
            do{
                random_color = getRndInteger(0, hard_colors_f.length);
            }while(last == random_color);
        }

        last = random_color;
        // random_number = 0;

        // console.log(mod.style.display);

        
        for(var i = 0; i < data.length; i++){
            
            if(i == random_number)
            {
                if(sc < 11)
                    d3.select('svg').append('circle').style("fill", color_true[random_color]);
                else
                    d3.select('svg').append('circle').style("fill", hard_colors_t[random_color]);
            }
            else
            {
                if(sc < 11)
                    d3.select('svg').append('circle').style("fill", color_false[random_color]);
                    else
                    d3.select('svg').append('circle').style("fill", hard_colors_f[random_color]);

            }
        }
        
    }
    
    
    function doo(){
        
        newColor();
        circles = d3.selectAll('circle'); 
        circles.data(data);
        applyAttrs();
        
        circles
        .attr("cx", function(d){
            return d.x;
        })
        .attr("cy", function(d){
            return d.y;
        })
        .attr("r", function(d){
            return d.radius;
        })
        .attr("id", function(d){
            return d.id;
        })
        ;
        
        addHandlers();
        
    }
    
    doo();
    
    function addHandlers(){
        d3.selectAll("circle")  
        .on("click", function(){
            if(mod.style.display == "none" && modal2.style.display == "none"){
                if(this.getAttribute("id") == random_number){
                        // this.diff = "false";                 
                        score.map(elem => {
                            elem.innerHTML = parseInt(elem.innerHTML) + 1;
                            sc = parseInt(elem.innerHTML);
                        })
                        
                        if(sc % 10 == 0 && sc < 101){
                            n = n + 1;
                        }
                    
                    
                        for(const c of circles)
                        c.remove();
                        
                        for(var i = 0; i < n * n; i++)
                        data.pop();
                        
                        count =  0;
                        
                        addData(n);
                        doo();
                    }
                    else
                    {
                        modal2.style.display = "block";
                        // window.alert("Game over!");
                        
                        best_score.map(elem=>{
                            bsc = parseInt(elem.innerHTML);
                        })

                        
                        if(sc > bsc)
                        {
                            // d3.select('modal2').append('p');
                            best_score.map(elem => {
                                elem.innerHTML = sc;
                                bsc = sc;
                            })

                            const node = document.createElement("h2");
                            node.setAttribute("class", "text-lost");
                            const textnode = document.createTextNode("New Best Score!");
                            node.appendChild(textnode);
                            document.getElementById('lost-modal').appendChild(node);
                            sc = 0;
                        }
                        else
                        {
                            modal2.style.height = "290px";
                            var node = document.getElementsByClassName("text-lost")[0];
                            if(node != undefined){
                                document.getElementById('lost-modal').removeChild(node);
                            }
                        }
                        // const newGame = document.getElementById("newGame");
                    }
                }
            }
            

            );
    }


    

    function addData(nrr){
        var raza = Math.floor(512 / (nrr * 2));

        for(var i = 1; i < nrr * 2; i+=2)
        {
            for(var j = 1; j < nrr * 2; j+=2)
            {
                data.push(
                    {
                        "x": raza * i,
                        "y": raza * j,
                        "radius": (raza - 1),
                        "id": count
                    });
                count++;
            }
        }
    }



    function applyAttrs(){
        var selection = d3.selectAll('circle');
        selection.data(data);

        selection
            .attr("cx", function(d){
                return d.x;
            })
            .attr("cy", function(d){
                return d.y;
            })
            .attr("r", function(d){
                return d.radius;
            })
            .attr("id", function(d){
                return d.id;
            });
    }

    
    
    const init = function(){

        if(modal2.style.display == "block")
        {
            return;
        }
        var node = document.getElementsByClassName("text-lost")[0];
        if(node != undefined){
            document.getElementById('lost-modal').removeChild(node);
        }

        
        
        
        if(mod.style.display == "none"){
            score.map(elem => {
                elem.innerHTML = 0;
            })
            
            
            for(const c of circles)
            c.remove();
            
            for(var i = 0; i < n * n; i++)
            data.pop();
            
            n = 2;
            count =  0;
            addData(n);
            doo();  

        }
    }

    const newGame = function(){
        var node = document.getElementsByClassName("text-lost")[0];
        if(node != undefined){
            document.getElementById('lost-modal').removeChild(node);
        }

        modal2.style.display = "none";     

        score.map(elem => {
            elem.innerHTML = 0;
        })
        
        
        for(const c of circles)
        c.remove();
        
        for(var i = 0; i < n * n; i++)
        data.pop();
        
        n = 2;
        count =  0;
        addData(n);
        doo();  
    }


    btnNew.addEventListener('click', init);
    btnNewModal.addEventListener('click', newGame);


    sett.onclick = function(){
        if(modal2.style.display == "block")
        {
            return;
        }

        var bod = document.body;
        bod.classList.toggle("dark-mode");
        $imgsrc = $('img').attr('src');

        if($imgsrc == "images/moon.png")
            $("img").attr("src",'images/sun.png');
        else
            $("img").attr("src",'images/moon.png');
        // if(sett.src == "images/sun.png"){
        //     console.log(sett.src);
        // }
    }

    span[1].onclick = function(){
        modal2.style.display = "none";
        init();
    }

});
