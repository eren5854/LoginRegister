using Ardalis.SmartEnum;

namespace LoginRegisterServer.Domain.SmartEnums;
public sealed class UserRoleSmartEnum : SmartEnum<UserRoleSmartEnum>
{
    public static readonly UserRoleSmartEnum Admin = new UserRoleSmartEnum("Admin", 1);
    public static readonly UserRoleSmartEnum User = new UserRoleSmartEnum("User", 2);
    public static readonly UserRoleSmartEnum Author = new UserRoleSmartEnum("Author", 2);

    public UserRoleSmartEnum(string name, int value) : base(name, value)
    {
    }
}
