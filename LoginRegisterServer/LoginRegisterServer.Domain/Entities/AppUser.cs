using LoginRegisterServer.Domain.SmartEnums;
using Microsoft.AspNetCore.Identity;

namespace LoginRegisterServer.Domain.Entities;
public sealed class AppUser: IdentityUser<Guid>
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => string.Join(", ", FirstName, LastName);
    public DateOnly DateOfBirth { get; set; }
    public string? ProfilePicture { get; set; }
    public UserRoleSmartEnum UserRole { get; set; } = UserRoleSmartEnum.User;

    public string? RefreshToken {  get; set; }
    public DateTime? RefreshTokenExpires { get; set; }

    public string? EmailConfirmCode { get; set; }
    public DateTime? EmailConfirmCodeExpires { get; set; }

    public bool IsDeleted { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTime? UpdatedDate { get; set; }
}
