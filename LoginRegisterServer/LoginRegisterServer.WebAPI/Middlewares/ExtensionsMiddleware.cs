using LoginRegisterServer.Domain.Entities;
using LoginRegisterServer.Domain.SmartEnums;
using Microsoft.AspNetCore.Identity;

namespace LoginRegisterServer.WebAPI.Middlewares;

public static class ExtensionsMiddleware
{
    public static void CreateAdmin(WebApplication app)
    {
        using (var scoped = app.Services.CreateScope())
        {
            var userManager = scoped.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
            if (!userManager.Users.Any(p => p.Email == "eren@gmail.com"))
            {
                AppUser user = new()
                {
                    FirstName = "Eren",
                    LastName = "Delibaş",
                    UserName = "ied",
                    Email = "eren@gmail.com",
                    DateOfBirth = DateOnly.Parse("21.02.1999"),
                    UserRole = UserRoleSmartEnum.Admin,
                    IsDeleted = false,
                    CreatedBy = "System",
                    CreatedDate = DateTime.Now,
                };

                userManager.CreateAsync(user, "Password123*").Wait();
            }
        }
    }
}
