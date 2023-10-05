import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {

  public type Note = {
    id: Text;
    title: Text;
    content: Text;
  };

  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(idText: Text, titleText: Text, contentText: Text) {
    let newNote: Note = {
      id = idText;
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  public query func readNotes(): async [Note] {
    return List.toArray(notes);
  };

  public func removeNote(idToDelete: Text) {
    notes := List.filter<Note>(notes, func note {note.id != idToDelete});
    Debug.print(debug_show(notes));
  };

};
