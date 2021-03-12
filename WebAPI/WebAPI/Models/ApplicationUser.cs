using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class ApplicationUser:IdentityUser
    {
        [Column(TypeName="Nvarchar(150)")]
        public string Name { get; set; }
        public int UserID { get; set; }
        public int UserRoleID { get; set; }
    }
}
