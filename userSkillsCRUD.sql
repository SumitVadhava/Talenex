select * from Users
select * from UserSkills

DECLARE @UserId UNIQUEIDENTIFIER;

INSERT INTO UserSkills (
    Id,
    UserId,
    SkillsOffered,
    SkillsWanted
)
VALUES (
    NEWID(),
    'FBC11675-7478-4963-AF99-DE8E3FE03971', -- existing Users.Id
    'C#, ASP.NET Core, SQL Server',
    'React, Docker'
);

INSERT INTO UserSkills (
    Id,
    UserId,
    SkillsOffered,
    SkillsWanted
)
VALUES (
    NEWID(),
    '0B862342-492A-41FC-AFAA-BA428CA83EA6', -- another existing Users.Id
    'Java, Spring Boot, MySQL',
    'System Design, AWS'
);



