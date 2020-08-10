const DATABASE_URL = "http://invittus.com/project-1/";
const DELETE_ACCOUNT_URL = DATABASE_URL+"delete/Account/";
const UPDATE_ACCOUNT_URL = DATABASE_URL+"update/Account/";
const ADD_USER_URL = DATABASE_URL+"api/user/addUser/";
const DELETE_USER_URL = DATABASE_URL+"account/user/delete/";
const GET_USERS_URL = DATABASE_URL+"account/users/profila/";
const CREATE_QRCODE_URL = DATABASE_URL+"QR/Create";
let users={};

   
$(document).ready(function(){
    
    let accountData = {
        id:sessionStorage.getItem("userId") , 
        name:sessionStorage.getItem("userName"), 
        email:sessionStorage.getItem("email"),
        password:sessionStorage.getItem("passWord")
       }

    displayAccountData(accountData);
    getAccountDependents();
    console.log("ID: "+accountData.id +" Name: "+accountData.name+" Email: "+accountData.email+" Password: "+accountData.password);

    //Buttons Actions ........
    $('#btn-deleteAccount').on('click',function (accountData){
        deleteAccount(accountData);
      });

    $('#edit-profile').on('click', function(e){
        $('#edit-modal').modal('show');
        e.preventDefault();
      });
      
      $('#edit-submit').on('click', function(e){
         updateProfile();
        $('#edit-modal').modal('hide');
        e.preventDefault();
      });

      $('#add-user').on('click', function(e){
        $('#qr-modal').modal('show');
        e.preventDefault();
      });

      $('#addDependent').on('click', function(e){
        addAccountDependent();
        $('#qr-modal').modal('hide');
        e.preventDefault();
       });


    //    $('.testing-show').on('click', function(e){
    //     $('#userData-modal').modal('show');
    //     e.preventDefault();
    //    });
 
});

//Display data for current account (not with dependents)
function displayAccountData(accountData)
{  
   let navData ="";
   let headerData ="";
   let data = "" ;
   let editProfileData ="";

   navData =`<div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src="images/person.jpg">
                </span>
                <div class="media-body ml-2 d-none d-lg-block">
                    <span class="mb-0 text-sm text-light  font-weight-bold" id="nav-userName">`+accountData.name+`</span>
                </div>
            </div>`
   
   headerData =`<div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Hello,`+accountData.name+`</h1>
                        <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your data</p>
                        <a href="#!" class="btn btn-info" id="edit-profile">Edit profile</a>
                    </div>
                </div>`
   data = ` <div class="row">
                <div class="col-lg-4">
                    <div class="form-group focused">
                    <label class="form-control-label">Full Name</label>
                    <div class="form-control form-control-alternative"><p>`+accountData.name+`</p></div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="form-group">
                    <label class="form-control-label">Email address</label>
                    <div class="form-control form-control-alternative"><p>`+accountData.email+`</p></div>
                    </div>
                </div>
               </div>
            </div>`

    editProfileData = ` <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                            <form class="modal-content qr-form" id="qr-form">
                                <div class="modal-header">
                                    <button type="button" class="close white" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group row">
                                    <label for="" class="col-sm-4 col-form-label">Full Name</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="edit-name" value="`+accountData.name+`">
                                    </div>
                                    </div>
                                    <div class="form-group row">
                                    <label for="" class="col-sm-4 col-form-label">Email</label>
                                    <div class="col-sm-8">
                                        <input type="email" class="form-control" id="edit-email" value="`+accountData.email+`">
                                    </div>
                                    </div>
                                    <div class="form-group row">
                                    <label for="" class="col-sm-4 col-form-label">Old Password</label>
                                    <div class="col-sm-8">
                                        <input type="password" class="form-control" id="edit-passOld" value="`+accountData.password+`">
                                    </div>
                                    </div>
                                    <div class="form-group row">
                                    <label for="" class="col-sm-4 col-form-label">New Password</label>
                                    <div class="col-sm-8">
                                        <input type="password" class="form-control" id="edit-passNew" value="`+accountData.password+`">
                                    </div>
                                    </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary"  id="edit-submit">Save Changes</button>
                                </div>
                            </form><!-- /.modal-content -->
                    </div>`
    
    document.getElementById('nav-userContent').innerHTML = navData ;
    document.getElementById("user-data").innerHTML = data;
    document.getElementById("header-data").innerHTML = headerData;
    document.getElementById("edit-modal").innerHTML = editProfileData ;
}
//Delete Account
function deleteAccount()
{    
    let id = sessionStorage.getItem("userId");
    let name = sessionStorage.getItem("userName");
    let email = sessionStorage.getItem("email");
    let password = sessionStorage.getItem("passWord");

    alert("Do you want to delete account of: "+ name+" with ID: "+id+"  ?");
	$.ajax({
		accept:"application/json",
		type: "DELETE",
		contentType: "application/json",
		url: DELETE_ACCOUNT_URL+id,
		success: function() {
              alert("User: " + name + " with ID: " + id + " is successfuly deleted") ;
              window.location.replace("index.html");
        },
        error: function(){
            
              alert("Oops,  Something wrong !");
        }
	});
}
//Update Account
function updateAccount()
{
    let id = sessionStorage.getItem("userId");
    let name = sessionStorage.getItem("userName");
    let email = sessionStorage.getItem("email");
    let password = sessionStorage.getItem("passWord");
    alert("ID: "+id +" Name: "+name+" Email: "+email+" Password: "+password);
    $.ajax({
        accept: "application/json",
        type: "PUT",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: UPDATE_ACCOUNT_URL+id ,
        data: JSON.stringify({"userName":name,"passWord":password,"email":email}),
        success: function(data) {
            // alert("your ID is: " + data["id"] + " with password: " + data["passWord"]);
            alert('Profile updated Succefuly');
            window.location.replace("home.html");
        },
        error: function(){
            alert("Error, Maybe data is wrong");
        }
    });

    return false ;
}
//Add Dependents to the current account
function addAccountDependent() 
{   
    let name = $("#qr-name").val();
    let workPosition = $("#qr-workPosition").val();
    let bloodType = $("#qr-bloodType").val();
    let currAddress = $("#qr-address").val();
    let closePerName = $("#qr-closeName1").val();
    let closePerPhone = $("#qr-closeNumber1").val();
    let closePerAddress = $("#qr-closeAddress1").val();
    let closePerName2 = $("#qr-closeName2").val();
    let closePerPhone2 = $("#qr-closeNumber2").val();
    let closePerAddress2 = $("#qr-closeAddress2").val();
    let accountId = sessionStorage.getItem("userId");
    let accountName = sessionStorage.getItem("userName");
    $.ajax({
        accept:"application/json",
        type:"POST",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: ADD_USER_URL+accountId,
        data: JSON.stringify({"name":name,"workPosition":workPosition,"bloodType":bloodType,"currentAddress":currAddress,
                              "nameClosePerson":closePerName,"numberClosePerson":closePerPhone,
                              "adderssClosePerson":closePerAddress,"secNameClosePerson":closePerName2,
                              "secNumberClosePerson":closePerPhone2,"secAdderssClosePerson":closePerAddress2
                            }),
        success: function(data) {
            alert("Welcome "+ name +" , You are added Successfuly to " + accountName);
            console.log("id for new user is: "+ data["id"]);
                        // Create QR-Code
                        $.ajax({
                            accept:"application/json",
                            type: "POST",
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            url:CREATE_QRCODE_URL ,
                            data: JSON.stringify({"id":data["id"],"name":name,"workPosition":workPosition,"bloodType":bloodType,"currentAddress":currAddress,
                            "nameClosePerson":closePerName,"numberClosePerson":closePerPhone,
                            "adderssClosePerson":closePerAddress,"secNameClosePerson":closePerName2,
                            "secNumberClosePerson":closePerPhone2,"secAdderssClosePerson":closePerAddress2
                          }),
                            success: function(data) {
                                alert("QR-Code for "+name+" is created successfuly");
                                location.reload();
                               
                            },
                            error: function(){
                                alert("Error, error in creating QR-Code ! for ID: "+data["id"]);
                            }
                        });
            
        },
        error: function(){
            alert("Oops, Something went wrong");
        }
    });
}
//Get all Dependents for the current account
function getAccountDependents() 
{
    let accountId = sessionStorage.getItem("userId");
    let accountName = sessionStorage.getItem("userName");
    $.ajax({
        accept:"application/json",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url:GET_USERS_URL+accountId ,
        success: function(data) {
            users= data;
            console.log(users);
            console.log('Getting users data done');
            console.log("Users Array lenght:  " + users.length);
            displayDependents(users.length); 
            $('.showUserModal').on('click', function(e){
                $('#userData-modal').modal('show');
                e.preventDefault();
              });

        },
        error: function(){
            console.log("Error, error in getting users data !");
        }
    });

    return false ;
}
function displayDependents(usersLength) 
{
   let dependentsCards="";
   let dependentModal ="";

   for(var i=0 ; i < usersLength ; i++)
   {
    dependentsCards += `<div class="dependent mx-2 mt-4">
                        <div class="card " style="width:18rem;">
                            <img src="images/person.jpg" class="card-img-top" alt="..." style="height: 15rem;">
                            <div class="card-body">
                            <h3 class="card-title">`+users[i].name+`</h3>
                            <a href="#" class="btn btn-primary showUserModal" id="btn-`+users[i].id+`">Show</a>
                            </div>
                        </div>
                    </div>`;

    dependentModal += ` <div class="modal fade bd-example-modal-md " tabindex="-1" role="dialog" id="userData-modal">    
                            <div class="modal-dialog modal-lg " role="document">
                                <div class="modal-content ">
                                    <div class="modal-header">
                                        <button type="button" class="close white" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    </div>
                                    <!-- <div class="modal-body pt-10"> -->
                                        <div class="test-div">
                                            <div class="avatar ">
                                            <img src="images/icons/avatar.png" alt="Avatar">
                                            </div>
                                            <!-- <h2 class=" float-right">User data</h2>  -->     
                                        </div>
                                        <div class="dep-data container bg-secondary">
                                        <div class="row">
                                            <div class="col-6 ">
                                            <div class="form-group">
                                                <label class="form-control-label">Full name</label>
                                                <div class="form-control form-control-alternative" ><p>`+users[i].name+`</p></div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-control-label">Work address</label>
                                                <div class="form-control form-control-alternative" ><p>`+users[i].workPosition+`</p></div>
                                            </div> 
                                            </div>
                                            <div class="col-6">
                                            <div class="form-group">
                                                <label class="form-control-label">Home address</label>
                                                <div class="form-control form-control-alternative" ><p>`+users[i].currentAddress+`</p></div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-control-label">Blood type</label>
                                                <div class="form-control form-control-alternative" ><p>`+users[i].bloodType+`</p></div>
                                            </div> 
                                            </div> 
                                        </div>
                                        <hr>
                                        Close persons <br><br>
                                        <div class="row">
                                            <div class="col-6 ">
                                            <div class="form-group">
                                                <label class="form-control-label">Person name (1)</label>
                                                <div class="form-control form-control-alternative" ><p>`+users[i].nameClosePerson+`</p></div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-control-label">Person phone number (1)</label>
                                                <div class="form-control form-control-alternative" ><p>`+users[i].numberClosePerson+`</p></div>
                                            </div> 
                                            </div>
                                            <div class="col-6">
                                            <div class="form-group">
                                                <label class="form-control-label">Person address (1)</label>
                                                <div class="form-control form-control-alternative" ><p>`+users[i].adderssClosePerson+`</p></div>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6 ">
                                            <div class="form-group">
                                                <label class="form-control-label">Person name (2)</label>
                                                <div class="form-control form-control-alternative" ><p>`+users[i].secNameClosePerson+`</p></div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-control-label">Person phone number (2)</label>
                                                <div class="form-control form-control-alternative" ><p>`+users[i].secNumberClosePerson+`</p></div>
                                            </div> 
                                            </div>
                                            <div class="col-6">
                                            <div class="form-group">
                                                <label class="form-control-label">Person address (2)</label>
                                                <div class="form-control form-control-alternative" ><p>`+users[i].secAdderssClosePerson+`</p></div>
                                            </div>
                                            </div>
                                        </div>

                                        </div>

                                        <!-- End Modal body -->              
                                    <div class="modal-footer">     
                                        <a href="`+users[i].image_source+`" class="btn btn-primary" id="qr-show">Show QR-Code</a>           
                                        <button onclick="deleteDependent(`+users[i].id+`)"type="submit" class="btn btn-danger" id="btn-deleteUser">Delete</button>
                                        <button type="submit" class="btn btn-info " id="btn-updateUser">Update</button>
                                    </div>
                                </div><!-- End modal-content -->
                            </div><!-- End modal-dialog -->
                        </div> <!-- End Modal -->`;
   }
   document.getElementById("dependents").innerHTML = dependentsCards;
   document.getElementById("dependents-modals").innerHTML = dependentModal;
}

//Delete dependent
function deleteDependent(id)
{    
    alert("Sure you want to delete this dependent with id: "+id+" ? ");
	$.ajax({
		accept:"application/json",
		type: "DELETE",
		contentType:"application/json",
		url: DELETE_USER_URL+id,
		success: function() {
              alert("Dependent with ID: " + id + " is successfuly deleted") ;
              location.reload();
        },
        error: function(){
            
              alert("Oops,  Something wrong in delteing this dependent with id: "+id+" !");
        }
	});
}

