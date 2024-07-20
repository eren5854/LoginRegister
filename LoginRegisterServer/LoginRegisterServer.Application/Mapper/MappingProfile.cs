using AutoMapper;
using LoginRegisterServer.Application.Features.Auth.ChangePassword;
using LoginRegisterServer.Application.Features.Auth.Register;
using LoginRegisterServer.Application.Features.Users.UpdateUser;
using LoginRegisterServer.Domain.Entities;

namespace LoginRegisterServer.Application.Mapper;
public sealed class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<RegisterCommand, AppUser>()
            .ForMember(x => x.FirstName, options =>
            {
                options.MapFrom(y => y.FirstName.Trim());
            })
            .ForMember(x => x.LastName, options =>
            {
                options.MapFrom(y => y.LastName.Trim());
            });

        CreateMap<ChangePasswordCommand, AppUser>();

        CreateMap<UpdateUserCommand, AppUser>()
            .ForMember(x => x.FirstName, options =>
            {
                options.MapFrom(y => y.FirstName.Trim());
            })
           .ForMember(x => x.LastName, options =>
           {
               options.MapFrom(y => y.LastName.Trim());
           });
    }
}
