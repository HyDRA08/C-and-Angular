using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace WebAPI.Models
{
    public class MakersPortalRepository
    {
        private string DBConnectionString;

        public MakersPortalRepository()
        {
            DBConnectionString = "Data Source=QB-TP-240\\SQLSERVER2016;Initial Catalog=faredge_20181130;User ID=SA;Password=qburst";
        }


        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(DBConnectionString);
            }
        }

        //CURD Operations for User

        public void AddUser(User user)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "insert into AngCore_User (UserName,UserPassword) values (@UserName,@UserPassword)";
                dbConnection.Open();
                dbConnection.Execute(strSQL, user);
            }
        }

        public User GetUserByID(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_User where UserID=@Id";
                dbConnection.Open();
                return dbConnection.Query<User>(strSQL, new { Id = id }).FirstOrDefault();
            }
        }

        public IEnumerable<User> GetAllUser()
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_User au inner join AngCore_Roles ar on au.UserRoleID=ar.RoleID";
                dbConnection.Open();
                return dbConnection.Query<User>(strSQL).ToList();
            }
        }

        public void UpdateUser(User user)
        {
            var userDetails = new User()
            {
                UserID = user.UserID,
                FullName = user.FullName,
                UserName = user.UserName,
                UserEmail = user.UserEmail,
                UserRoleID = user.UserRoleID,
            };
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_User where UserID=@Id";
                dbConnection.Open();
                var row = dbConnection.Query<User>(strSQL, new { Id = user.UserID }).FirstOrDefault();
                dbConnection.Close();
                var identityID = row.IdentityUserID;
                

                strSQL = "update AngCore_User set FullName=@FullName ,UserName=@UserName,UserEmail=@UserEmail,UserRoleID=@UserRoleID where UserID= @Id";
                dbConnection.Open();
                dbConnection.Execute(strSQL, new { FullName = userDetails.FullName, UserName = userDetails.UserName, UserEmail = userDetails.UserEmail, UserRoleID = userDetails.UserRoleID,Id= userDetails .UserID});
                dbConnection.Close();

                strSQL = "update AspNetUsers set Name=@FullName ,UserName=@UserName,Email=@UserEmail,UserRoleID=@UserRoleID where id= @IID";
                dbConnection.Open();
                dbConnection.Execute(strSQL, new { FullName = userDetails.FullName, UserName = userDetails.UserName, UserEmail = userDetails.UserEmail, UserRoleID = userDetails.UserRoleID, IID= identityID });
            }
        }

        public void DeleteUser(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_User where UserID=@Id";
                dbConnection.Open();
                var row= dbConnection.Query<User>(strSQL, new { Id = id }).FirstOrDefault();
                dbConnection.Close();
                var identityID = row.IdentityUserID;

                strSQL = "delete from AngCore_User where UserID=@Id";
                dbConnection.Open();
                dbConnection.Execute(strSQL, new { Id = id });
                dbConnection.Close();

                strSQL = "delete from AspNetUsers where id=@IID";
                dbConnection.Open();
                dbConnection.Execute(strSQL, new { IID = identityID });
            }
        }

        //CURD Operations for Items

        public void AddItem(Items item)
        {
            var itemDetails = new Items
            {
                ItemName = item.ItemName,
                ItemPrice = item.ItemPrice
            };

            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "insert into AngCore_Items (ItemName,ItemPrice) values (@ItemName,@ItemPrice)";
                dbConnection.Open();
                dbConnection.Execute(strSQL, new { ItemName = itemDetails.ItemName, ItemPrice = itemDetails.ItemPrice });
            }
        }

        public Items GetItemById(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_Items where ItemID=@Id";
                dbConnection.Open();
                return dbConnection.Query<Items>(strSQL, new { Id = id }).FirstOrDefault();
            }
        }

        public IEnumerable<Items> GetAllItem()
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_Items order by ItemID";
                dbConnection.Open();
                return dbConnection.Query<Items>(strSQL).ToList();
            }
        }

        public void UpdateItem(Items item)
        {
            var itemDetails = new Items()
            {
                ItemID=item.ItemID,
                ItemName = item.ItemName,
                ItemPrice = item.ItemPrice
            };
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "update AngCore_Items set ItemName=@ItemName, ItemPrice =@ItemPrice where ItemID=@ItemID";
                dbConnection.Open();
                dbConnection.Execute(strSQL, new { ItemID =itemDetails.ItemID, ItemName = itemDetails.ItemName, ItemPrice = itemDetails.ItemPrice });
            }
        }

        public void DeleteItem(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "delete from AngCore_Items where ItemID=@Id";
                dbConnection.Open();
                dbConnection.Execute(strSQL, new { ID = id });
            }
        }

        //CURD Operations for Order

        public void CreateOrder(Order order)
        {
            var itemDetails = new Order
            {
                OrderItemID = order.OrderItemID,
                OrderUserID = order.OrderUserID,
                PayModeID = order.PayModeID,
                isDeleted = order.isDeleted,
            };

            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "insert into AngCore_Orders(OrderItemID,OrderUserID,PayModeID,isDeleted) values (@OrderItemID,@OrderUserID,@PayModeID,@isDeleted)";
                dbConnection.Open();
                dbConnection.Execute(strSQL, new { OrderItemID = itemDetails.OrderItemID, OrderUserID = itemDetails.OrderUserID, PayModeID = itemDetails.PayModeID, isDeleted = itemDetails.isDeleted });
            }
        }

        //public Items GetOrder(int id)
        //{
        //    using (IDbConnection dbConnection = Connection)
        //    {
        //        string strSQL = "select * from AngCore_Items where ItemID=@Id";
        //        dbConnection.Open();
        //        return dbConnection.Query<Items>(strSQL, new { Id = id }).FirstOrDefault();
        //    }
        //}
        
        public IEnumerable<Order> GetOrder(int id)
        {
            var userID = 5;
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_Orders aco inner join AngCore_User acu on aco.OrderUserID=acu.UserID inner join AngCore_Items aci on aci.ItemID=aco.OrderItemID inner join AngCore_PaymentMode acp on acp.PayModeID=aco.PayModeID where aco.OrderUserID=@UserID";
                dbConnection.Open();
                return dbConnection.Query<Order>(strSQL,new { UserID=userID});
            }
        }

        public IEnumerable<Order> GetAllOrder(int id)
        {
            var userID = 5;
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_Orders aco inner join AngCore_User acu on aco.OrderUserID=acu.UserID inner join AngCore_Items aci on aci.ItemID=aco.OrderItemID inner join AngCore_PaymentMode acp on acp.PayModeID=aco.PayModeID where aco.OrderUserID=@UserID";
                dbConnection.Open();
                return dbConnection.Query<Order>(strSQL, new { UserID = userID });
            }
        }

        public void UpdateOrder(Order order)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "update AngCore_Orders set OrderItemID=@OrderItemID,OrderUserID=@OrderUserID where OrderID = @OrderID ";
                dbConnection.Open();
                dbConnection.Execute(strSQL, order);
            }
        }

        public void DeleteOrder(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "update AngCore_Orders set isDeleted=1 where OrderID=@Id";
                dbConnection.Open();
                dbConnection.Execute(strSQL, new { Id = id });
            }
        }

        public IEnumerable<Role> GetRoles()
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_Roles order by RoleID";
                dbConnection.Open();
                return dbConnection.Query<Role>(strSQL).ToList();
            }
        }

        public IEnumerable<PaymentMode> GetPaymentModes()
        {
            using (IDbConnection dbConnection = Connection)
            {
                string strSQL = "select * from AngCore_PaymentMode order by PayModeID";
                dbConnection.Open();
                return dbConnection.Query<PaymentMode>(strSQL).ToList();
            }
        }
    }
}
