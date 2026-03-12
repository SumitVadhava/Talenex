export const mapUsersApiToSkillsList = (users) => {
    if (!Array.isArray(users)) return [];

    // console.log("Mapping done");

    return users
      .filter((user) => user.skills?.skillsOffered?.length > 0)
      .map((user) => ({
        id: user?.userId ?? user.email,
        user: {
          id: user.profile?.id ?? user.email,
          email: user.email,
          name: user.profile?.fullName ?? `${user.firstName} ${user.lastName}`,
          avatar: user.profile?.profilePhotoUrl ?? user.imageUrl ?? "",
          location: user.profile?.location ?? "",
          rating: user.reputation?.averageRating ?? 0,
          reviewCount: user.reputation?.totalReviews ?? 0,
          totalSwapsCompleted: user.reputation?.totalSwapsCompleted ?? 0,
          showLocation: user.privacy?.showLocation ?? true,
          availableOnWeekdays: user.availability?.availableOnWeekdays ?? true,
          availableOnWeekends: user.availability?.availableOnWeekends ?? true,
          notifyOnRequest: user.notifications?.notifyOnSwapRequest ?? true,
        },

        // 🔥 ALL OFFERED SKILLS
        offeredSkills: user.skills.skillsOffered.map((skill) => ({
          title: skill.title,
          category: skill.category,
          level: skill.level,
          description: skill.description,
          certificateURL: skill.certificateURL,
        })),

        // 🔥 ALL WANTED SKILLS
        seekingSkills: user.skills.skillsWanted?.map((s) => s.name || s.title || s) ?? [],

        isOnline: false,
        postedAt: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })
          : "",
        reviews: Array.isArray(user.reviews) ? user.reviews.map((review) => ({
          id: review.id,
          reviewerAvatar: review.reviewerAvatar,
          reviewerName: review.reviewerName,
          rating: review.rating,
          reviewMsg: review.reviewMsg,
          createdAt: review.createdAt,
        })) : [],
      }));
  };