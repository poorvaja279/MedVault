// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedVault {
  struct User { address wallet; string uhid; bool exists; }
  mapping(address => User) public users;

  event PatientRegistered(address indexed wallet, string uhid);
  event RecordStored(address indexed uploader, string uhid, string fileHash, string fileUrl);

  function registerPatient(string memory uhid) public {
    require(!users[msg.sender].exists, "already") ;
    users[msg.sender] = User(msg.sender, uhid, true);
    emit PatientRegistered(msg.sender, uhid);
  }

  function storeRecord(string memory uhid, string memory fileHash, string memory fileUrl) public {
    require(users[msg.sender].exists, "not registered");
    emit RecordStored(msg.sender, uhid, fileHash, fileUrl);
  }
}
