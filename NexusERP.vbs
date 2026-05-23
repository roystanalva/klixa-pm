Set objShell = CreateObject("WScript.Shell")
objShell.Run chr(34) & CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName) & "\NexusERP.cmd" & Chr(34), 0, False
