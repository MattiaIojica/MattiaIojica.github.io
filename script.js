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
    const troph = document.getElementById("trophy");
    const modal1 = document.getElementById('modal1'); //modal game over with no best new score
    const modal2 = document.getElementById('modal2'); //modal new today's top score
    const modal3 = document.getElementById('modal3'); //modal today's top - Trophy
    const span = document.getElementsByClassName('close');
    const bd = document.querySelector('div');
    const ma = document.querySelector('main');
    const switch1 = document.getElementById('sw1');
    const switch2 = document.getElementById('sw2');
    var top_score_name = localStorage.getItem("top_score_name");
    var top_score_local = localStorage.getItem("top_score_local");
    var top_score = localStorage.getItem("top_score_local");
    const form = document.querySelector("#myForm");
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
    var sss = (($(window).width() <= 851) ? 404 : 512);
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


    
    var data = [];


    addData(sss, n);


    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    
    
    // console.log(top_score);

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
    
    
    function doo(bool){
        // console.log(bool);
        if(bool == false)
            newColor();
        else
            keepColor();

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
    
    doo(false);
    
    function addHandlers(){
        d3.selectAll("circle")  
        .on("click", function(){
            // console.log(n);
            if(modal1.style.display == "none"){
                if(this.getAttribute("id") == random_number){
                        // this.diff = "false";                 
                        score.map(elem => {
                            elem.innerHTML = parseInt(elem.innerHTML) + 1;
                            sc = parseInt(elem.innerHTML);
                        })

                        // console.log(sc);
                        
                        if(sc % 10 == 0 && sc < 101){
                            n = n + 1;
                        }
                        count =  0;
                        init(sss, false);
                    }
                    else
                    {
                        // modal2.style.display = "block";

                        best_score.map(elem=>{
                            bsc = parseInt(elem.innerHTML);
                        })

                        var newBest = new Boolean(false);

                        if(sc > bsc)
                        {
                            best_score.map(elem => {
                                elem.innerHTML = sc;
                                bsc = sc;
                            })
                            newBest = true;
                            sc = 0;
                        }
                        else
                        {
                            modal1.style.display = "block";
                            modal1.style.height = "290px";
                            var node = document.getElementsByClassName("text-lost")[0];
                            if(node != undefined){
                                document.getElementById('lost-modal').removeChild(node);
                            }
                        }

                        if(bsc > top_score && newBest == true)
                        {
                            modal2.style.display = "block";
                            top_score = bsc;
                            localStorage.setItem("top_score_local", top_score);
                        }
                        else
                        if(bsc <= top_score && newBest == true)
                        {
                            modal1.style.display = "block";
                            const node = document.createElement("h2");
                            node.setAttribute("class", "text-lost");
                            const textnode = document.createTextNode("New Personal Best Score!");
                            node.appendChild(textnode);
                            document.getElementById('lost-modal').appendChild(node);
                        }
                    }
                }
            }
            

            );
    }

    

    function addData(size, nrr){
        var raza = Math.floor(size / (nrr * 2));
        
        
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

    function keepColor(){

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

    var lastWidth = $(window).width();
    var startWidth = $(window).width();


    function check() {
        var x = $(window).width();

        if(startWidth != -1){
            if(startWidth <= 850)
            {
                sss = 404;
                init(sss, true);
            }
            else{
                sss = 512;
                init(sss, true);
            }
            startWidth = -1;
        }

        if(x != lastWidth){

            if(x > 850)
            {
                sss = 512;
                init(sss, true);
            }
            else
            if(x < 851)
            {
                sss = 404;
                init(sss, true);
            }
            
            lastWidth = x;
        }
            setTimeout(check, 1);
        }
        


    check();


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
    
    
    function init(size = 512, bool = false){

        if(modal1.style.display == "block" || modal2.style.display == "block")
        {
            return;
        }
        var node = document.getElementsByClassName("text-lost")[0];
        if(node != undefined){
            document.getElementById('lost-modal').removeChild(node);
        }
        
        
        for(const c of circles)
        c.remove();
        
        for(var i = 0; i < n * n; i++)
        data.pop();
        
        count =  0;
        addData(size, n);
        doo(bool);  

    }

    //modal2 button "New Game"
    const newGame = function(){
        
        var node = document.getElementsByClassName("text-lost")[0];
        if(node != undefined){
            document.getElementById('lost-modal').removeChild(node);
        }
        
        modal1.style.display = "none";     
        
        score.map(elem => {
            elem.innerHTML = 0;
        })
        
        
        for(const c of circles)
        c.remove();
        
        for(var i = 0; i < n * n; i++)
        data.pop();
        
        n = 2;
        count =  0;
        addData(sss, n);
        doo(false);  
    }

    const ini = function(){
        n = 2;
        score.map(elem => {
            elem.innerHTML = 0;
        })
        init(sss, false);
    }

    btnNew.addEventListener('click', ini);
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
    }

    span[0].onclick = function(){
        modal1.style.display = "none";
        ini();
    }


    span[1].onclick = function(){
        modal3.style.display = "none";
        var node = document.getElementsByClassName("today-top")[0];
        if(node != undefined){
            document.getElementById('todays-top').removeChild(node);
        }
    }

    troph.onclick = function(){
        if(modal1.style.display == "block" || modal2.style.display == "block")
            return;
        if(modal3.style.display == "none"){
            const node = document.createElement("h2");
            modal3.style.display = "block";
            node.setAttribute("class", "today-top");
            const textnode = document.createTextNode("🥇 " + localStorage.getItem("top_score_name") + " 🥇");
            node.appendChild(textnode);
            document.getElementById('todays-top').appendChild(node);
            
            const node2 = document.createElement("h2");
            node2.setAttribute("class", "today-top-score");
            const textscore = document.createTextNode("Score: " + localStorage.getItem("top_score_local"));
            node2.appendChild(textscore);
            document.getElementById('todays-top').appendChild(node2);
        }
        else
        {
            modal3.style.display = "none";
            var node = document.getElementsByClassName("today-top")[0];
            if(node != undefined){
                document.getElementById('todays-top').removeChild(node);
            }

            var node2 = document.getElementsByClassName("today-top-score")[0];
            if(node2 != undefined){
                document.getElementById('todays-top').removeChild(node2);
            }
        }
    }
    
    function date_check(){
        const date = new Date();

        if(date.getHours() == 0 && date.getMinutes() == 0 && date.getSeconds() == 0){
            localStorage.setItem("top_score_name", "---");
            localStorage.setItem("top_score_local", 0);
        }
        setTimeout(date_check, 1000);
    }

    date_check();

    
    form.addEventListener("submit", function (evt) {

        var name = document.getElementById('fname').value;
        // name_top_score = name;
        modal2.style.display = "none";
        localStorage.setItem("top_score_name", name);

        newGame();
        event.preventDefault();
        return false;
    });
});
