const chooseImg = document.querySelector(".choose-img")
const inputFile = document.querySelector(".file-input")
let previewImg = document.querySelector(".preview-img img")
const filterOptions = document.querySelectorAll(".filter button")
let sliderInput = document.querySelector(".slider input")
let filterValue = document.querySelector(".filter-info .value")
const rotateOption = document.querySelectorAll(".rotate button")
const resetBtn = document.querySelector(".reset-filter")
const saveImg = document.querySelector(".save-img")

let brightness = 100, saturation= 100, inversion = 0, grayscale = 0
let rotate = 0, flipVeritical = 1, flipHorizonal = 1


const filterAplyer = () => {
   previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`

   previewImg.style.transform = `rotate(${rotate}deg) scale(${flipVeritical}, ${flipHorizonal})`
}

const selectionImg = () => {
   let file = inputFile.files[0]
   if(!file) return
    previewImg.src = URL.createObjectURL(file)
    previewImg.addEventListener("load", () => {
      document.querySelector(".disable").classList.remove("disable")
    })
}

filterOptions.forEach(option => {
   option.addEventListener("click", () => {
      document.querySelector(".active").classList.remove("active")
      option.classList.add("active")
      document.querySelector(".filter-info .name").innerText = option.innerText
      
      if(option.id === "Brightness"){
        sliderInput.max = "200"
        sliderInput.value = brightness
        filterValue.innerText = `${brightness}%`
      } else  if(option.id === "Saturation"){
         sliderInput.max = "200"
         sliderInput.value = saturation 
         filterValue.innerText =  `${saturation}%`

      } else  if(option.id === "Inversion"){
         sliderInput.max = "100"
         sliderInput.value = inversion
         filterValue.innerText =  `${inversion}%`
      } else{
         sliderInput.max = "100"
         sliderInput.value = grayscale
         filterValue.innerText =  `${grayscale}%`
      }
       
   })
})

const valueChanger = () => {
   filterValue.innerText = `${sliderInput.value}%`
   let active = document.querySelector(".active")

   if(active.id === "Brightness"){
      brightness = sliderInput.value
   } else  if(active.id === "Saturation"){
      saturation = sliderInput.value
   } else  if(active.id === "Inversion"){
      inversion = sliderInput.value
   } else{
      grayscale = sliderInput.value
   }

   filterAplyer()
}


rotateOption.forEach(option => {
   option.addEventListener("click", () => {
       
      if(option.id === "rotate-left"){
         rotate -=90
       } else if(option.id === "rotate-right"){
          rotate +=90
 
       } else if(option.id === "flip-vertical"){
          flipVeritical = flipVeritical == 1 ? -1 : 1
       } else{
         flipHorizonal = flipHorizonal == 1 ? -1 : 1
       }

       filterAplyer()

   })
})

const resetImg = () => {
   brightness = 100, saturation= 100, inversion = 0, grayscale = 0
   rotate = 0, flipVeritical = 1, flipHorizonal = 1
   filterAplyer()
   document.getElementById("Brightness").click()
}

const imgSaver = () => {
   let canvas = document.createElement("canvas")
   let ctx = canvas.getContext("2d")
   canvas.width = previewImg.naturalWidth
   canvas.height = previewImg.naturalHeight

   ctx.translate(canvas.width / 2, canvas.height / 2)

  if(!rotate == 0){
   ctx.rotate(rotate * Math.PI / 180)
  }

  ctx.scale(flipVeritical, flipHorizonal)

  ctx.filter =  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
   ctx.drawImage(previewImg, -canvas.width / 2,  -canvas.height / 2, canvas.width, canvas.height)

   // document.querySelector("body").appendChild(canvas)

   let link = document.createElement("a")
   link.download = "image.jpg"
   link.href = canvas.toDataURL()
   link.click()
   
}

// Event Listeners
chooseImg.addEventListener("click", () => inputFile.click())
inputFile.addEventListener("change", selectionImg)
sliderInput.addEventListener("input", valueChanger)
resetBtn.addEventListener("click", resetImg)
saveImg.addEventListener("click", imgSaver)