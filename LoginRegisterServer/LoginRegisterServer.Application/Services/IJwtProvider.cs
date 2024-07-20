using LoginRegisterServer.Application.Features.Auth.Login;
using LoginRegisterServer.Domain.Entities;

namespace LoginRegisterServer.Application.Services;
public interface IJwtProvider
{
    Task<LoginCommandResponse> CreateToken(AppUser user);
}
