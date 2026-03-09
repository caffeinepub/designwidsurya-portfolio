import List "mo:core/List";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    projectType : Text;
    message : Text;
  };

  let submissions = List.empty<ContactSubmission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, projectType : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      projectType;
      message;
    };
    submissions.add(submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    submissions.toArray();
  };
};
