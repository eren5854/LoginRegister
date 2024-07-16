using AutoMapper;
using ED.GenericRepository;
using ED.Result;
using GenericFileService.Files;
using LoginRegisterServer.Domain.Entities;
using LoginRegisterServer.Domain.SmartEnums;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LoginRegisterServer.Application.Features.Auth.Register;
internal class RegisterCommandHandler(
    UserManager<AppUser> userManager,
    IMapper mapper,
    IUnitOfWork unitOfWork) : IRequestHandler<RegisterCommand, Result<string>>
{
    public async Task<Result<string>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        if (request.Email != "")
        {
            if (request.UserName != "")
            {
                var isEmailExists = await userManager.Users.AnyAsync(x => x.Email == request.Email);
                if (isEmailExists)
                {
                    return Result<string>.Failure("Email already exists");
                }

                var isUserNameExists = await userManager.Users.AnyAsync(x => x.UserName == request.UserName);
                if (isUserNameExists)
                {
                    return Result<string>.Failure("User name already exists");
                }

                string profilePicture = FileService.FileSaveToServer(request.ProfilePicture, "wwwroot/ProfilePictures/");
            
                AppUser user = mapper.Map<AppUser>(request);
                //Random random = new();
                //user.EmailConfirmCode = random.Next(100000, 999999);
                //user.EmailConfirmCodeExpires = DateTime.Now;
                user.ProfilePicture = profilePicture;
                user.CreatedBy = request.UserName;
                user.CreatedDate = DateTime.Now;
                user.UserRole = UserRoleSmartEnum.User;

                IdentityResult result = await userManager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                {
                    return Result<string>.Failure("Record could not be created.");
                }
                await unitOfWork.SaveChangesAsync(cancellationToken);
                return Result<string>.Succeed("User registration successful.");
            }
            return Result<string>.Failure("User Name field cannot be empty");
        }
        return Result<string>.Failure("E-mail field cannot be empty.");
    }
}
