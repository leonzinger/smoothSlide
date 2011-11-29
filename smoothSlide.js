$.fn.smoothSlide = function(){
    var $el = this,
        $l = $el.find('li'),
        elPositionsObj = $el[0].getBoundingClientRect(),
        elPositionCenter = {
            left:(elPositionsObj.width/2)-($l.width()/2),
            right:(elPositionsObj.width/2)+($l.width()/2)
        },
        ctx,
        carousel = {
            interval:null,
            speed:10,
            scrollTo:null,
            howMuch:null,
            init:function(){
                ctx = this;
                this.binds();    
            },
            binds:function(){
                $el.hover(ctx.mouseIn ,ctx.mouseOut).mousemove(function(e){
                    ctx.mousePos(e.clientX);    
                });    
            },
            scrollRight:function(){
                $el.scrollLeft($el.scrollLeft() + ctx.howMuch);
            },
            scrollLeft:function(){
                $el.scrollLeft($el.scrollLeft() - ctx.howMuch);
            },
            noScroll:function(){
            
            },
            mousePos:function(pos){
                ctx.scrollTo = ctx.calcScrollSide(pos);
                ctx.howMuch = ctx.calcHowMuch(ctx.scrollTo, pos)/60;
            },
            calcHowMuch:function(scrollTo, pos){
                var howMuch = 0;
                if(scrollTo === 'scrollRight'){
                    howMuch = pos - elPositionCenter.right;
                } else if(scrollTo === 'scrollLeft') {
                    howMuch = elPositionCenter.left - pos;
                }
                return howMuch;   
            },
            calcScrollSide:function(pos){
                var scrollSide = 'noScroll';
                if(pos < elPositionCenter.left){
                    scrollSide = 'scrollLeft';
                } else if(pos > elPositionCenter.right){
                    scrollSide = 'scrollRight';
                } 
                return scrollSide;                
            },
            mouseIn:function(){
                ctx.interval = setInterval(function(){
                    ctx[ctx.scrollTo]();
                },ctx.speed);
            },
            mouseOut:function(){
                clearInterval(ctx.interval);   
            } 
        };
    carousel.init();
};
 
$('ul').smoothSlide();