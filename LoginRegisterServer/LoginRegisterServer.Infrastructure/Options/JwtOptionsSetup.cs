using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace LoginRegisterServer.Infrastructure.Options;
public sealed class jwtOptionsSetup(IConfiguration configuration) : IConfigureOptions<JwtOptions>
{
    public void Configure(JwtOptions options)
    {
        configuration.GetSection("Jwt").Bind(options);
    }
}
