 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB2JfRh7LHzqBC0SIE_WMJlHKzdOfSwQiQ",
    authDomain: "olx-shary.firebaseapp.com",
    databaseURL: "https://olx-shary.firebaseio.com",
    projectId: "olx-shary",
    storageBucket: "olx-shary.appspot.com",
    messagingSenderId: "110049738985"
  };
  firebase.initializeApp(config);




  function wishListFun(key,key2,key3){


    var userid=localStorage.getItem('currentUserUid');
  
      if(userid==null || userid.toString()=="null" ){
  
        alert('You Must Log in to add items in Wishlist!!')
          location.href="../pages/logIn.html"
  
      }
  
    var wishKeys={
      key,
      key2,
      key3
    }
    localStorage.setItem('wishKeys',JSON.stringify(wishKeys))
  
  console.log(key,key2,key3)
    var userUid=localStorage.getItem('currentUserUid');
  var exWishArr=[]
    if(userUid!=null){
  
  
  
      firebase.database().ref(`allCategories/${key}/${key2}/${key3}`)
      .once("value",(data)=>{
        
        var wishObj=data.val();
        console.log(wishObj)
  
        firebase.database().ref(`wishLists/${userUid}/`)
        .once("value",(data)=>{
          var exWishObjs=data.val();
  
          for(var key in exWishObjs){
            for(var key2 in exWishObjs[key]){
              for(var key3 in exWishObjs[key][key2]){
  
                exWishArr.push(key3);
  
           
  
              }
            }
           
          }
          console.log(exWishArr)
          console.log(exWishArr.includes(key2)==false)
          
          var wishKeys=localStorage.getItem('wishKeys')
         var wishKeysObj=JSON.parse(wishKeys)
           if(exWishArr.includes(wishKeysObj.key3)==false){
  
             console.log(wishKeysObj)
             
              firebase.database().ref(`wishLists/${userUid}/${wishKeysObj.key}/${wishKeysObj.key2}/${wishKeysObj.key3}`)
              .set(wishObj) 
              .then((success)=>{
                alert('Item Added to Wishlist SuccessFully !!')
                
                })
                .catch((error)=>{
                  alert(error.message)
                })
          
          }
          else{
            alert('Already in WishList!!')
          }
              
            })
  
  
        
        
        
      })
      
    }
    
      
      
  }
  

  


  
  function viewItemDetails(key,key2,key3){

    let keysObj={
      key,
      key2,
      key3
    }
    localStorage.setItem('keysObj',JSON.stringify(keysObj));

    location.href="../pages/viewItemDetails.html"
  }

  function loadFun(){
      var selectedCat=localStorage.getItem('selectedCategory')
var mainDiv=document.getElementById('mainDiv');

var catHead=document.getElementById('catHead');
catHead.innerHTML=selectedCat

      firebase.database().ref(`allCategories/${selectedCat}/`)
      .on("value",(data)=>{
          var allItemsInCat=data.val();


          
        

          for(var key in allItemsInCat){
              for(var key2 in allItemsInCat[key]){

              

                    mainDiv.innerHTML +=
                     `
                     <div class="col-xs-12 col-sm-6 col-md-3">
                    <article class="card-wrapper">
                      <div class="image-holder">
                      <a href="javascript:void(0)" onclick='wishListFun("${selectedCat}","${key}","${key2}")' class="image-holder__link"> </a>
                      <div class="image-liquid image-holder--original" style="background-image: url('${allItemsInCat[key][key2].itemImg}')">
                        </div>
                      </div>
              
                      <div class="product-description">
                        <!-- title -->
                        <h1 class="product-description__title">
                          <a href="#">						
                          "${allItemsInCat[key][key2].itemName}"
                            </a>
                        </h1>
              
                        <!-- category and price -->
                        <div class="row">
                          <div class="col-xs-12 col-sm-8 product-description__category secondary-text">
                          "${allItemsInCat[key][key2].itemDesc}"
                          </div>
                          <div class="col-xs-12 col-sm-4 product-description__price">
                          "${allItemsInCat[key][key2].itemPrice}"
                          </div>
                        </div>
              
                        <!-- divider -->
                        <hr />
              
                        <!-- sizes -->
                        <div >

                        
                        
                        <!-- colors -->
                        
                        <a key= key1= class="btn btn-warning my-3 btn-block" style="color:white; " onclick='viewItemDetails("${selectedCat}","${key}","${key2}")'><strong>View Details</strong></a>                      </div>
              
                    </article>
                  </div>
                    `
                   
            }

            

                   
                    
                
                
              
            
          }

      })
  }




  
  function logOutFun(){
  
  
    firebase.auth().signOut()
    .then(function() {
   localStorage.setItem('currentUserUid',null)
   localStorage.setItem('recieverId',null)
    localStorage.setItem('recieverEmail',null)
    localStorage.setItem('currentUserData',null);
  
  
  
  
   location.href="../index.html"
    }).catch(function(error) {
     alert(error.message)
    });    
  }