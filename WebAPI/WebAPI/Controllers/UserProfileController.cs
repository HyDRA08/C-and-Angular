using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        public UserProfileController(UserManager<ApplicationUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            this._configuration = config;
        }
        public IDbConnection Connection
        {
            get
            {
                var connString = _configuration.GetConnectionString("ConnectionString");
                return new SqlConnection(connString);
            }
        }
        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);

            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_User where IdentityUserID=@userID";
                dbConnection.Open();
                var userRow = dbConnection.Query<User>(strSQL, new { userID = userId }).FirstOrDefault(); 
                return new
                {

                    //user.Name,
                    //user.Email,
                    //user.UserName,
                    //user.UserRoleID,
                    userRow.UserID,
                    userRow.UserEmail,
                    userRow.UserName,
                    userRow.UserRoleID,
                    userRow.FullName
                };
            }

            //return new
            //{
                
            //    user.Name,
            //    user.Email,
            //    user.UserName,
            //    user.UserRoleID,
            //};

        }
    }
}