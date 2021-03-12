using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using WebAPI.Models;
using System.Data;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        //public static string GetConnectionString()
        //{
        //    if (ConfigurationManager.ConnectionStrings["pcContext"] != null)
        //    {
        //        return ConfigurationManager.ConnectionStrings["pcContext"].ConnectionString;
        //    }
        //    else
        //    {
        //        if (ConfigurationManager.AppSettings["DBConnectionString"] != null)
        //            return ConfigurationManager.AppSettings["DBConnectionString"];
        //        else
        //            return ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
        //    }
        //}

        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly IConfiguration _configuration;
        //public static string GetConnectionString()
        //{
        //    return Configuration.ConnectionStrings["ConnectionString"].ConnectionString;
        //}
        public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,IOptions<ApplicationSettings> appSettings, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
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
        [HttpPost]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser(ApplicationUserModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                Name = model.Name,
                UserRoleID = model.UserRoleID,
            };

            try
            {
                if(applicationUser.UserRoleID==0)
                {
                    applicationUser.UserRoleID = 3;
                }

                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                if (result.Succeeded)
                {
                    var id = applicationUser.Id;
                    var userName = applicationUser.UserName;
                    var name = applicationUser.Name;
                    var roleId = applicationUser.UserRoleID;
                    var email = applicationUser.Email;
                    using (IDbConnection dbConnection = Connection)
                    {
                        string strSQL = "insert into AngCore_User (UserName,IdentityUserID,FullName,UserRoleID,UserEmail) values (@UserName,@IdentityID,@UName,@RoleID,@Email)";
                        dbConnection.Open();
                        dbConnection.Execute(strSQL, new { IdentityID = id, UserName = userName, UName = name, RoleID= roleId , Email=email});
                    }
                        
                }
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel login)
        {
            var user = await _userManager.FindByNameAsync(login.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }
    }
}