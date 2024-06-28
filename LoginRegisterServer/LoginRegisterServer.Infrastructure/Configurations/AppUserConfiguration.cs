using LoginRegisterServer.Domain.Entities;
using LoginRegisterServer.Domain.SmartEnums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LoginRegisterServer.Infrastructure.Configurations;
public sealed class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder.Property(p => p.UserRole).HasConversion(p => p.Value, v => UserRoleSmartEnum.FromValue(v));
        builder.HasQueryFilter(filter => !filter.IsDeleted);
    }
}
