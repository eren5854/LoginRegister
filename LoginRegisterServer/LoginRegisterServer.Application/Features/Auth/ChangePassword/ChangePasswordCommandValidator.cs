using FluentValidation;

namespace LoginRegisterServer.Application.Features.Auth.ChangePassword;
public sealed class ChangePasswordCommandValidator: AbstractValidator<ChangePasswordCommand>
{
    public ChangePasswordCommandValidator()
    {
        RuleFor(x => x.NewPassword)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"[0-9]").WithMessage("Password must contain at least one digit.")
            .Matches(@"[\!\?\*\.\@\#]").WithMessage("Password must contain at least one special character (!?*.@#).");
    }
}
