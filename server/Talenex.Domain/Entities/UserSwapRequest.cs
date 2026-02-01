using System.ComponentModel.DataAnnotations;
using Talenex.Domain.Entities;

public class UserSwapRequest : IEntity
{
    public Guid Id { get; set; }

    
    [Required]
    public Guid RequesterId { get; set; }
    public UserProfile Requester { get; set; }

    
    [Required]
    public Guid ReceiverId { get; set; }
    public UserProfile Receiver { get; set; }

 
    [Required, MaxLength(100)]
    public string SkillToOffer { get; set; }

    [Required, MaxLength(100)]
    public string SkillToLearn { get; set; }

    [Required]
    public string ProposedTime { get; set; }

    [Required]
    public int DurationMinutes { get; set; }

    public string? Message { get; set; } = "";

    [Required, MaxLength(20)]
    public string Status { get; set; } = "Pending";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? AcceptedAt { get; set; }
    public DateTime? CancelledAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}
