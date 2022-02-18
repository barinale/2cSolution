
class Slider{
    constructor(Arrow,items,progress=null){
        this.LeftArrow = Arrow.querySelector('.rightArrow');
        this.RightArrow = Arrow.querySelector('.leftArrow');   
        this.items = items;
        this.merge = this.items.getBoundingClientRect().x;
        this.postion = 0;
        this.addEvent();
        this.item = this.items.querySelectorAll('.item');
        this.postions = this.allPostion();
        if(progress!=null){
            this.progress = progress;
            this.move()
            this.width = 8;
        }
        this.click= false;
        this.step = this.getSteps()
        this.LeftMove()
        this.rightMove()

    }
    getSteps(){
        let step =0;
        this.item.forEach(element=>{
            if(element.getBoundingClientRect().x + element.getBoundingClientRect().width +this.merge>window.innerWidth){
                step ++;
            }
        })
        return step;
    }
    addEvent(){
        this.LeftArrow.addEventListener('click',()=>{
            if(this.progress!=null){
            this.width=8;
            this.check();
            this.click = true;}
            this.LeftMove()
        })
        this.RightArrow.addEventListener('click',()=>{
            if(this.progress!=null){
            this.width=8;
            this.check();
            this.click = true;
        }
            this.rightMove()})
    }
    allPostion(){

      let Array =[];
      this.item.forEach(element => {
          Array.push(element.getBoundingClientRect().x-this.merge)
      });
      return Array;
    }
    LeftMove(){
        if(this.postion==this.step){
            this.postion=0;
        this.items.style.right=`${this.postions[this.postion]}px`;

        }else{
        this.postion++;
        this.items.style.right=`${this.postions[this.postion]}px`;
        }
    }
    rightMove(){
        if(this.postion==0){
            this.postion=this.step;
          this.items.style.right=`${this.postions[this.postion]}px`;
        }else{
        this.postion--;
        this.items.style.right=`${this.postions[this.postion]}px`;
        
        }
    }
    resize(){
        this.items.style.left=`0px`;
        this.item = this.items.querySelectorAll('.item');
        this.postions = this.allPostion()
        this.step = this.getSteps()
        if(this.progress!=null){
            this.click = true;
            this.check()
            this.width=8;
        }
          this.postion =0;
        this.items.style.left=`initial`;
        this.items.style.right = this.postions[0]
          
    }
    move(){
        
            setInterval(() => {
                this.progress.style.width = this.width+'%';

                    if(!this.click){
                    this.progress.style.width = this.width+'%';
                    this.width++;
                    if(this.width>=100){
                        this.width=0;
                        this.LeftMove()
                    }
            }
            }, 70);
        
    }
    check(){
        setTimeout(() => {
            this.click=false
        }, 3000);
     
    }

}

const SliderMain = new Slider(document.querySelector('#main .Arrows'),
                                document.querySelector('#main .items'),
                                document.querySelector('#main .progress'));

const SliderMain1 = new Slider(document.querySelector('#OeuvreMajeur .Arrows'),
                            document.querySelector('#OeuvreMajeur .items')
                            ,null);


const SliderMain2 = new Slider(document.querySelector('#calendrier .OeuvreArrow'),
                            document.querySelector('#calendrier .items')
                            ,null);


const SliderMain3 = new Slider(document.querySelector('#ventreRec .OeuvreArrow'),
                            document.querySelector('#ventreRec .items')
                            ,null);

window.addEventListener('resize', ()=>{
    SliderMain.resize()
    SliderMain1.resize()
    SliderMain2.resize()
    SliderMain3.resize()

});

