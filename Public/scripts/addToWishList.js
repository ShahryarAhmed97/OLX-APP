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

    //prefixes of implementation that we want to test
   



  var request = window.indexedDB.open("customers");

request.onerror = function(event) {
    // Do something with request.errorCode!
  };
  request.onsuccess = function(event) {
    // Do something with request.result!
  };


  
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


    var userid=localStorage.getItem('currentUserUid').toString();

    if(userid==null || userid=="null" ){
        location.href="../pages/logIn.html"

    }

var mainDiv=document.getElementById('mainDiv');
var userUid=localStorage.getItem('currentUserUid');
try{



      firebase.database().ref(`wishLists/${userUid}/`)
      .on("value",(data)=>{
          var allCats=data.val();
console.log(allCats)
           localStorage.setItem('wishListData',JSON.stringify(allCats));

           import { set } from 'idb-keyval';

           set(allCats)
             .then(() => console.log('It worked!'))
             .catch(err => console.log('It failed!', err));

          
           mainDiv.innerHTML=''

          for (var key in allCats) {
            for(var key2 in allCats[key]){
                for(var key3 in allCats[key][key2]){
  
  
  
                  mainDiv.innerHTML += `
                 
                
                    <div class="col-xs-12 col-sm-6 col-md-3">
                      <article class="card-wrapper">
                        <div class="image-holder">
                          <a href="javascript:void(0)" onclick='wishListFun("${key}","${key2}","${key3}")' class="image-holder__link"> </a>
                          <div class="image-liquid image-holder--original" style="background-image: url('${allCats[key][key2][key3].itemImg}')">
                          </div>
                        </div>
                
                        <div class="product-description">
                          <!-- title -->
                          <h1 class="product-description__title">
                            <a href="#">						
                            "${allCats[key][key2][key3].itemName}"
                              </a>
                          </h1>
                
                          <!-- category and price -->
                          <div class="row">
                            <div class="col-xs-12 col-sm-8 product-description__category secondary-text">
                            "${allCats[key][key2][key3].itemDesc}"
                            </div>
                            <div class="col-xs-12 col-sm-4 product-description__price">
                            "${allCats[key][key2][key3].itemPrice}"
                            </div>
                          </div>
                
                          <!-- divider -->
                          <hr />
                
                          <!-- sizes -->
                          <div >
  
                          
                          
                          <!-- colors -->
                          
                          <a  class="btn btn-warning my-3 btn-block" style="color:white " onclick='viewItemDetails("${key}","${key2}","${key3}")'><strong>View Details</strong></a>                        </div>
                        </div>
                
                      </article>
                    </div>
  
             
                  `
  
                }
              }
            }
             
          
      })
    }
    catch(error){
      alert(error.message)

    


    }
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




  function clearAll(){
    var userUid=localStorage.getItem('currentUserUid')
    firebase.database().ref(`wishLists/${userUid}`).remove()
    .then((succes)=>{
      location.reload();

    }).catch((error)=>{


    })
  }










  
//   var connectedRef = firebase.database().ref(".info/connected");
// connectedRef.on("value", function(snap) {
//   if (snap.val() === true) {
//     console.log("connected");
//   } else {
//     console.log("not connected");

//     var mainDiv=document.getElementById('mainDiv');
// mainDiv.innerHTML=''


//     var wishListData=JSON.parse(localStorage.getItem('wishListData'))
//     console.log('catch wala')
    
//           for (var key in wishListData) {
//             for(var key2 in wishListData[key]){
//                 for(var key3 in wishListData[key][key2]){
    
    
    
//                   mainDiv.innerHTML += `
                 
                
//                     <div class="col-xs-12 col-sm-6 col-md-3">
//                       <article class="card-wrapper">
//                         <div class="image-holder">
//                           <a href="javascript:void(0)" onclick='wishListFun("${key}","${key2}","${key3}")' class="image-holder__link"> </a>
//                           <div class="image-liquid image-holder--original" style="background-image: url('${wishListData[key][key2][key3].itemImg}')">
//                           </div>
//                         </div>
                
//                         <div class="product-description">
//                           <!-- title -->
//                           <h1 class="product-description__title">
//                             <a href="#">						
//                             "${wishListData[key][key2][key3].itemName}"
//                               </a>
//                           </h1>
                
//                           <!-- category and price -->
//                           <div class="row">
//                             <div class="col-xs-12 col-sm-8 product-description__category secondary-text">
//                             "${wishListData[key][key2][key3].itemDesc}"
//                             </div>
//                             <div class="col-xs-12 col-sm-4 product-description__price">
//                             "${wishListData[key][key2][key3].itemPrice}"
//                             </div>
//                           </div>
                
//                           <!-- divider -->
//                           <hr />
                
//                           <!-- sizes -->
//                           <div >
    
                          
                          
//                           <!-- colors -->
                          
//                           <a  class="btn btn-warning my-3 btn-block" style="color:white " onclick='viewItemDetails("${key}","${key2}","${key3}")'><strong>View Details</strong></a>                        </div>
//                         </div>
                
//                       </article>
//                     </div>
    
             
//                   `
    
//                 }
//               }
//             }
    
//   }
// });

