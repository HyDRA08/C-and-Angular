using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly MakersPortalRepository makersPortalRepository;

        public UserController()
        {
            makersPortalRepository = new MakersPortalRepository();
        }

        [HttpPost]
        public void Post([FromBody]User user)
        {
            makersPortalRepository.AddUser(user);
        }

        [HttpGet("{Id}")]
        [Route("Updateuser")]
        public void Update([FromBody]User user)
        {
            makersPortalRepository.UpdateUser(user);
        }

        [HttpGet]
        [Route("GetUsers")]
        //GET : /api/User/Get
        public IEnumerable<User> Get()
        {
            return makersPortalRepository.GetAllUser();
        }

        [HttpDelete("{id}")]
        [Route("DeleteUser/{id}")]
        public void Delete(int id)
        {
            makersPortalRepository.DeleteUser(id);
        }
        [Route("Roles")]
        public IEnumerable<Role> GetRoles()
        {
            return makersPortalRepository.GetRoles();
        }
    }
}