import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addUser, updateUser, deleteUser} from '../store/userSlice';

const UserDetail = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  const [isModalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    const newId = new Date().getTime();
    dispatch(addUser({id: newId, name, email, phone}));
    setModalVisible(false);
    resetForm();
  };

  const handleUpdate = () => {
    dispatch(updateUser({id: editingUser.id, name, email, phone}));
    setModalVisible(false);
    resetForm();
  };

  const handleEdit = user => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setModalVisible(true);
  };

  const handleDelete = id => {
    dispatch(deleteUser(id));
  };

  const resetForm = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.userItem}>
            <TouchableOpacity
              onPress={() => handleEdit(item)}
              style={styles.userText}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={{...styles.text, fontSize: 16}}>{item.phone}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />
            {editingUser ? (
              <TouchableOpacity onPress={handleUpdate} style={styles.saveBtn}>
                <Text style={styles.btnText}>Update</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => {
                setModalVisible(false), resetForm();
              }}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  addButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: '#007BFF',
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userText: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    width: '80%',
  },
  saveBtn: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
});

export default UserDetail;
